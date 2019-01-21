export default function (users, contact, messages, socket, chat) {
    socket.on('connect-contact', async (data) => {
        socket.uuid = data.uuid;
        data.id = socket.id;

        await contact.connect(data);

        chat.to(data.id).emit('contactReceiveMessages', await messages.getByContact(data.uuid));
        
        socket.to('agents').emit('contact-list', await contact.getAll());
    });

    socket.on('connect-agent', async (token) => {
        socket.token = token;

        if (!await users.checkAuth(socket)) {
            socket.emit('auth-failed');
            return;
        }

        socket.join('agents');

        chat.to('agents').use(async (socket, next) => {
            
            if (!await users.checkAuth(socket)) {
                socket.emit('auth-failed');
                return;
            }

            next();
        });

        chat.to('agents').emit('contact-list', await contact.getAll());
        chat.to('agents').emit('agentReceiveMessage', await messages.getAll());
    });

    socket.on('disconnect', () => {
        if (socket.uuid) {
            console.log('iniciou desconexão')
            contact.disconnect(socket.uuid)
                .then(async () => {
                    socket.to('agents').emit('contact-list', await contact.getAll());
                    console.log('desconectado');
                });
            
        }
    })
}
