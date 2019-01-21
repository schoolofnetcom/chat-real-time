export default function (users, socket, usersNamespace) {
    socket.on('request-users', async () => {
        if (!await users.checkAuth(socket)) {
            socket.emit('auth-failed');
            return;
        }
        usersNamespace.emit('get-users', await users.all());
    });

    socket.on('save-user', async (data) => {
        if (!await users.checkAuth(socket)) {
            socket.emit('auth-failed');
            return;
        }
        users.create(data).then(() => {
            usersNamespace.emit('saved-user');
        });
    });

    socket.on('authenticate', (data) => {
        console.log('recebi o método', data)
        users.auth(data).then((res) => {
            socket.emit('authenticated', res);
            socket.token = res.token;
        })
    });
}