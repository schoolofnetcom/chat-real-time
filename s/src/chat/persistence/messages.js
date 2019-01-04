export default class Messages {
    constructor() {
        this.messages = [];
    }

    sendMessage(contact, message_text, is_from_contact) {
        const message = {
            context: is_from_contact,
            message: message_text
        };

        const message_key = this.getByContactKey(contact);

        if (message_key === -1) {
            this.messages.push({
                contact_uuid: contact,
                messages: [message]
            });
        } else {
            this.messages[message_key].messages.push(message);
        }
    }

    getByContact(contact) {
        const message_key = this.getByContactKey(contact);

        if (message_key === -1) {
            return null;
        }

        return this.messages[message_key];
    }

    getByContactKey(contact) {
        return this.messages.findIndex((item) => {
            return item.contact_uuid = contact
        });
    }
}