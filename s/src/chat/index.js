import Contact from './persistence/contacts';
import contactSocket from './sockets/contact';
import messagesSocket from './sockets/messages';

const contact = new Contact;

module.exports = function (io) {
    const chat = io.of('/chat');

    chat.on('connection', (socket) => {
        contactSocket(contact, socket, chat);
        messagesSocket(contact, socket, chat);
    });
};
