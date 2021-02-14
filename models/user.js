const mongoose = require('mongoose')
const Schema = mongoose.Schema

// function validateEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

const userSchema = new Schema({
    username: {
        type: String,
        requireed: true,
        index: {
            unique: true
        },
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        },
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    added_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = userModel = mongoose.model('users', userSchema);