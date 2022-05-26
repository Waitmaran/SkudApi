const express = require('express');
const router = express.Router();
const ClassRoomUsers = require('../models/ClassRoomUsers');
const User = require('../models/User');
const Classroom = require('../models/Classroom')
const authenticateToken = require('../middleware/authenticate');
const dotenv = require('dotenv/config');
const mongoose = require('mongoose');

router.post('/', (req, res) => {
    authenticateToken(req, res, () => {
        const classroom = Classroom.findById(req.body.classroom_id, "+key").then(data => {
            const reservation = new ClassRoomUsers({
                user: mongoose.Types.ObjectId(req.body.user_id),
                classroom: mongoose.Types.ObjectId(req.body.classroom_id),
                classroomName: data.name,
                classroomType: data.type,
                classroomKey: data.key
            });
    
            console.log(reservation)
        
            reservation.save()
            .then(data => {
                res.status(200).json({data});
            })
            .catch(err => {
                res.status(400).json({messageServ: err});
            });
        }).catch(err => {res.status(200).json(data)})
    })
});


router.get('/', (req, res) => {
    authenticateToken(req, res, () =>
    {
        const reservation = ClassRoomUsers.find({user: req.body.userid})
        
        .then(data => {res.status(200).json(data)})
        .catch(err => {res.status(400).json(err)})
    })
});

router.get('/:id', (req, res) => {
    authenticateToken(req, res, () =>
    {
        ClassRoomUsers.findById(req.params.id).populate(user)
        .then(data => {res.status(200).json({id : req.body.id, user: req.body.user,  classroom: req.body.classroom, classnumber: req.body.classnumber})})
        .catch(err => {res.status(400).json(err)})
    })
})

router.delete('/:id', (req, res) => {
    authenticateToken(req, res, () => {
        ClassRoomUsers.remove({
            _id: req.params.id
        }).then(data => {res.status(200).json(data)})
        .catch(err => {res.status(400).json(err)})
    })
});

module.exports = router;