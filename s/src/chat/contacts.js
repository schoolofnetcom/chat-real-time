export default class Contact {
    constructor() {
        this.contacts = [];
    }

    connect(data) {
        const contactKey = this.getContactKey(data.uuid);

        if (contactKey === -1) {
            const contact = {
                uuid: data.uuid,
                urls: [data.url]
            }
            this.contacts.push(contact);
        } else {
            const url = this.contacts[contactKey].urls[0];
            if (url !== data.url) {
                this.contacts[contactKey].urls.splice(0, 0, data.url);
            }
        }
    }

    disconnect(uuid) {
        // const contactKey = this.getContactKey(uuid);

        // if (contactKey > -1) {
        //     this.contacts.splice(contactKey, 1);
        // }
    }

    getContactKey(uuid) {
        const contactKey = this.contacts.findIndex((item) => {
            return item.uuid === uuid;
        });

        return contactKey;
    }
}