import Contact from './persistence/contacts';
import Messages from './persistence/messages';
import contactSocket from './sockets/contact';
import messagesSocket from './sockets/messages';

const contact = new Contact;
const messages = new Messages;

module.exports = function (io) {
    const chat = io.of('/chat');

    chat.on('connection', (socket) => {
        contactSocket(contact, messages, socket, chat);
        messagesSocket(contact, messages, socket, chat);
    });
};
