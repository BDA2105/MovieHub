const mongoose = require('mongoose');

// comment Schema
const commentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    film: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
},);

const Comment = module.exports = mongoose.model('Comment', commentSchema);