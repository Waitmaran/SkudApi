const mongoose = require('mongoose');


const ClassRoomUsersSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        required: true
    },
    classroom: {
        type: mongoose.ObjectId,
        required: true,
    },
    classnumber: {
        type : Number, 
        required: true,
        min: 1,
        max: 9 
    }
})

module.exports = mongoose.model('ClassRoomUsers', ClassRoomUsersSchema)