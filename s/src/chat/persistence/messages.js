import { MessageDB } from '../../../connection';

export default class Messages {
    sendMessage(contact, message_text, is_from_contact) {
        return new Promise(async (resolve, reject) => {
            const message = {
                context: is_from_contact,
                message: message_text
            };
    
            let message_db = await this.getByContact(contact);
    
            if (!message_db) {
                message_db = MessageDB({
                    contact_uuid: contact,
                    messages: [message]
                });
            } else {
                message_db.messages.push(message);
            }
    
            message_db.save((err) => {
                if (err) {
                    reject();
                    return;
                }
                resolve();
            });
        });
        
    }

    getByContact(contact) {
        return new Promise((resolve, reject) => {
            MessageDB.findOne({ contact_uuid: contact }, (err, data) => {
                if (err) {
                    reject();
                    return;
                }
                resolve(data);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            MessageDB.find({}, (err, data) => {
                if (err) {
                    reject();
                    return;
                }
                resolve(data);
            });
        });
    }
}