export default function (contact, messages, socket, chat) {
    socket.on('connect-contact', (data) => {
        socket.uuid = data.uuid;
        data.id = socket.id;

        contact.connect(data);
        socket.to('agents').emit('contact-list', contact.contacts);
        chat.to(data.id).emit('contactReceiveMessages', messages.getByContact(data.uuid));
    });

    socket.on('connect-agent', () => {
        socket.join('agents');
        chat.to('agents').emit('contact-list', contact.contacts);
        chat.to('agents').emit('agentReceiveMessage', messages.messages);
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
