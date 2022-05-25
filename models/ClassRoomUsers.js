const mongoose = require('mongoose');


const ClassRoomUsersSchema = mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        required: true
    },
    classroom: {
        type: mongoose.ObjectId,
        required: true
    },
    classroomName: {
        type: String,
        required: true
    },
    classroomType: {
        type: String,
        required: true
    },
    classroomKey: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('ClassRoomUsers', ClassRoomUsersSchema)