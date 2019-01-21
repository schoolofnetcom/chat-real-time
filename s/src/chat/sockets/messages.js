export default function (contactManager, messages, socket, chat) {
    socket.on('contactSendMessage', function (data) {
        contactManager.getContact(socket.uuid).then(async (contact) => {
            await messages.sendMessage(
                contact.uuid,
                data.message,
                true
            );
            chat.to('agents').emit('agentReceiveMessage', await messages.getAll());
        });
    });

    socket.on('agentSendMessage', async function (data) {
        await messages.sendMessage(
            data.contact.uuid,
            data.message,
            false
        );

        const contact = await contactManager.getContact(data.contact.uuid);

        chat.to(contact.id).emit('contactReceiveMessage', {
            message: data.message,
            context: false
        });
        
        chat.to('agents').emit('agentReceiveMessage', await messages.getAll());
    });
}
