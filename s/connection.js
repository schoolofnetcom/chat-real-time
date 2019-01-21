const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/atendimento_son', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('open', function () {
    console.log('we\'re connected');
});

export const ContactDB = mongoose.model('Contact', {
    id: String,
    uuid: String,
    connected: Boolean,
    urls: [String]
});

export const MessageDB = mongoose.model('Message', {
    contact_uuid: String,
    messages: [{
        context: Boolean,
        message: String
    }]
});

export const UserDB = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
});

export default mongoose;