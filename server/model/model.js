const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    country:{
        type: String,
        required: true
    },
})

const Userdb = mongoose.model('users', schema);

module.exports = Userdb;