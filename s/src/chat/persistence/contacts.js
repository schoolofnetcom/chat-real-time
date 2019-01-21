import { ContactDB } from '../../../connection';

export default class Contact {
    connect(data) {
        return new Promise(async (resolve, reject) => {
            let contact = await this.getContact(data.uuid);

            if (!contact) {
                contact = ContactDB({
                    id: data.id,
                    uuid: data.uuid,
                    connected: true,
                    urls: [data.url]
                });
            } else {
                contact.id = data.id;
                contact.connected = true;

                const url = contact.urls[0];
                if (url !== data.url) {
                    contact.urls.splice(0, 0, data.url);
                }
            }
            
            contact.save(() => {
                resolve();
            });
        });
    }

    disconnect(uuid) {
        return new Promise(async (resolve) => {
            const contact = await this.getContact(uuid);
            
            contact.connected = false;
            contact.save(() => {
                resolve();
            });
        })
        
    }

    getContact(uuid) {
        return new Promise((resolve, reject) => {
            ContactDB.findOne({uuid: uuid}, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            ContactDB.find({connected: true}, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }
}