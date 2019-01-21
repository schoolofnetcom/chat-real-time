import { UserDB } from '../../../connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../sockets/users';

export default class Users {
    create(data) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data.password, 10, (err, hash) => {
                data.password = hash;

                const user = UserDB(data);
                user.save((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                })
            });
        });
    }

    all() {
        return new Promise((resolve, reject) => {
            UserDB.find({}, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                data.forEach((item, key) => {
                    data[key].password = undefined;
                });

                resolve(data);
            })
        });
    }

    auth(data) {
        return new Promise((resolve, reject) => {
            UserDB.findOne({email: data.email}, (err, user) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!user) {
                    resolve(false);
                    return;
                }

                bcrypt.compare(data.password, user.password, (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!res) {
                        resolve(res);
                    }

                    const token = jwt.sign({ id: user._id }, 'qwd4xnzxi3!wnda%sd', {
                        // expiresIn: 3
                    });

                    resolve({ token: token });
                });
            });
        });
    }

    checkAuth(socket) {
        return new Promise((resolve, reject) => {
            jwt.verify(socket.token, 'qwd4xnzxi3!wnda%sd', (err, decoded) => {
                if (err) {
                    resolve(false);
                    return;
                }
                UserDB.findOne({_id: decoded.id}, (err, user) => {
                    if (err) {
                        resolve(false);
                        return;
                    }

                    if (!user) {
                        resolve(false);
                        return;
                    }

                    console.log(true);

                    resolve(true);
                });
            });
        })
    }
}