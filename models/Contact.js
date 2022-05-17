const {Schema, model, Types: {ObjectId} } = require('mongoose');

const contactSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'personal'
    }
});

const Contacts = model('Contacts', contactSchema);

module.exports = Contacts;