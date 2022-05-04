const express = require('express')
const router = express.Router();
const Classroom = require('../models/Classroom')
const dotenv = require('dotenv/config');
const authenticateToken = require('../middleware/authenticate')

router.get('/', (req, res) => {
    const classrooms = Classroom.find()
    .then(data => {res.status(200).json(data)})
    .catch(err => {res.status(400).json(err)})
});

router.post('/', (req, res) => {
    authenticateToken(req, res, () =>
    {
        const classroom = new Classroom({
            name: req.body.name,
            type: req.body.type
        });
        
        classroom.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({message: err});
        });
    })
});

router.get('/:id', (req, res) => {
    Classroom.findById(req.params.id)
    .then(data => {res.status(200).json(data)})
    .catch(err => {res.status(400).json(err)})
})

router.delete('/:id', (req, res) => {
    authenticateToken(req, res, () => {
        Classroom.remove({
            _id: req.params.id
        }).then(data => {res.status(200).json(data)})
        .catch(err => {res.status(400).json(err)})
    })
});

// router.patch('/:id', (req, res) => {
//     Classroom.updateOne({
//         _id: req.params.id
//     },
//     {
//         $set: {name: req.body.name}
//     }
//     ).then(data => {res.json(data)})
//     .catch(err => {res.json(err)})
// });

module.exports = router;