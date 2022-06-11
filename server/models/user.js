const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSubscribed: {
        type: Number
    },
    admin: {
        type: Number
    }

}, {
    collection: 'users'
});

const User = module.exports = mongoose.model('User', userSchema);