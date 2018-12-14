const io = require('socket.io')(80);

io.on('connection', (socket) => {
    console.log('Nova conexão');

    socket.on('disconnect', () => {
        console.log('alguém saiu');
    })
});
