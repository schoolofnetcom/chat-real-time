import Contact from './persistence/contacts';
import Messages from './persistence/messages';
import UsersPersistence from '../users/persistence/users';
import contactSocket from './sockets/contact';
import messagesSocket from './sockets/messages';

const contact = new Contact;
const messages = new Messages;
const users = new UsersPersistence;

module.exports = function (io) {
    const chat = io.of('/chat');

    chat.on('connection', (socket) => {
        contactSocket(users, contact, messages, socket, chat);
        messagesSocket(contact, messages, socket, chat);
    });
};
