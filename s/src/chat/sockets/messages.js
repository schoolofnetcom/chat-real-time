export default function (contactManager, messages, socket, chat) {
    socket.on('contactSendMessage', function (data) {
        const contact = contactManager.getContact(socket.uuid);
        messages.sendMessage(
            contact.uuid,
            data.message,
            true
        );
        chat.to('agents').emit('agentReceiveMessage', messages.messages);
    });

    socket.on('agentSendMessage', function (data) {
        
        messages.sendMessage(
            data.contact.uuid,
            data.message,
            false
        );

        const contact = contactManager.getContact(data.contact.uuid);

        chat.to(contact.id).emit('contactReceiveMessage', {
            message: data.message,
            context: false
        });
        
        chat.to('agents').emit('agentReceiveMessage', messages.messages);
    });
}
