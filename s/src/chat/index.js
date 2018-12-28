import Contact from './contacts';

const contact = new Contact;

module.exports = function (io) {
    const chat = io.of('/chat');

    chat.on('connection', (socket) => {
        socket.on('connect-contact', (data) => {
            socket.uuid = data.uuid;
            contact.connect(data);
            socket.to('agents').emit('contact-list', contact.contacts);
        });
    
        socket.on('connect-agent', () => {
            socket.join('agents');
        });
    
        socket.on('disconnect', () => {
            if (socket.uuid) {
                contact.disconnect(socket.uuid);
                socket.to('agents').emit('contact-list', contact.contacts);
            }
        })
    });
};
