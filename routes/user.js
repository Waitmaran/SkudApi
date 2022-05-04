const express = require('express');
const router = express.Router();
const User = require('../models/User');
const dotenv = require('dotenv/config');

router.get('/', async (req, res) => {
    const users = await User.find()
    .then(data => {res.status(200).json(data)})
    .catch(err => {res.status(400).json(err)});
});

router.delete('/:id', (req, res) => {
    User.remove({
        _id: req.params.id
    }).then(data => {res.status(200).json(data)})
    .catch(err => {res.status(400).json(err)})
});

module.exports = router;