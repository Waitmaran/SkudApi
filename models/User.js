const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        select: false,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: Number,
        required: true,
        min: 0,
        max: 2
    }
})

module.exports = mongoose.model('User', UserSchema)