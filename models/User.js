const {Schema, model} = require('mongoose');

const UserChema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
})

const User = model('User', UserChema)

module.exports = User;

