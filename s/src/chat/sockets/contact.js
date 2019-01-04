export default function (contact, socket, chat) {
    socket.on('connect-contact', (data) => {
        socket.uuid = data.uuid;
        data.id = socket.id;

        contact.connect(data);
        socket.to('agents').emit('contact-list', contact.contacts);
    });

    socket.on('connect-agent', () => {
        socket.join('agents');
        chat.to('agents').emit('contact-list', contact.contacts);
    });

    socket.on('disconnect', () => {
        if (socket.uuid) {
            console.log('iniciou desconexão')
            contact.disconnect(socket.uuid)
                .then(() => {
                    socket.to('agents').emit('contact-list', contact.contacts);
                    console.log('desconectado');
                });
            
        }
    })
}
