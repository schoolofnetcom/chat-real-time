import Users from './persistence/users';
import usersSocket from './sockets/users';

const users = new Users;

module.exports = function (io) {
    const usersNamespace = io.of('/users');

    usersNamespace.on('connection', (socket) => {
        usersSocket(users, socket, usersNamespace);
    });
}
