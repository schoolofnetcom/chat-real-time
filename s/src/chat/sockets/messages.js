import Messages from '../persistence/messages';
const messages = new Messages;

export default function (contactManager, socket, chat) {
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
        console.log(contact.id)

        chat.to(contact.id).emit('contactReceiveMessage', {
            message: data.message,
            context: false
        });
    });
}
