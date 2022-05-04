const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const dotenv = require('dotenv/config');

router.post('/', (req, res) => {
    const md5 = crypto.createHmac('md5', process.env.SECRET);
    const user = new User({
        name: req.body.name,
        login: req.body.login,
        password: md5.update(req.body.password).digest("hex"),
        role: req.body.role,
    });

    user.save()
    .then(data => {
        res.status(200).json({id: user.id, token: user.token});
    })
    .catch(err => {
        res.status(400).json({message: err});
    });
});

module.exports = router;

