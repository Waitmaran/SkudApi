const mongoose = require('mongoose');


const ClassroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true,
        select: false
    }
})

module.exports = mongoose.model('Classroom', ClassroomSchema)