export default class Contact {
    constructor() {
        this.contacts = [];
    }

    connect(data) {
        const contactKey = this.getContactKey(data.uuid);

        if (contactKey === -1) {
            const contact = {
                id: data.id,
                uuid: data.uuid,
                urls: [data.url]
            }
            this.contacts.push(contact);
        } else {
            const url = this.contacts[contactKey].urls[0];
            this.contacts[contactKey].id = data.id;

            if (url !== data.url) {
                this.contacts[contactKey].urls.splice(0, 0, data.url);
            }
        }

        if (this.contacts[contactKey] && this.contacts[contactKey].start_disconnection) {
            clearTimeout(this.contacts[contactKey].start_disconnection);
            this.contacts[contactKey].start_disconnection = null;
        }
    }

    disconnect(uuid) {
        return new Promise((resolve) => {
            const contactKey = this.getContactKey(uuid);

            if (this.contacts[contactKey].start_disconnection) {
                return;
            }
    
            const disconnection = () => {
                if (contactKey > -1) {
                    this.contacts.splice(contactKey, 1);
                    resolve();
                }
            }
    
            this.contacts[contactKey].start_disconnection = setTimeout(disconnection, 10000);
        })
        
    }

    getContact(uuid) {
        const contact_key = this.getContactKey(uuid);

        if (contact_key === -1) {
            return null;
        }

        return this.contacts[contact_key];
    }

    getContactKey(uuid) {
        const contactKey = this.contacts.findIndex((item) => {
            return item.uuid === uuid;
        });

        return contactKey;
    }
}