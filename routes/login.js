const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv/config');

router.post('/', (req, res) => {
    const md5 = crypto.createHmac('md5', process.env.SECRET);
    const u = User.findOne({login: req.body.login}, "+password")
    .then(
        (data) => {
            const pass = md5.update(req.body.password).digest("hex");
            if(data.password == pass) {
                const newToken = generateAccessToken(u.id);
                res.status(200).json({token: newToken, "id": data._id});
            } else {
                res.status(400).json({message: "wrong password"});
            }
        }
    )
    .catch(() => {res.status(400).json({message: "no user with this login", login: req.body.login})});
});

function generateAccessToken(id) {
    return jwt.sign({id: id}, process.env.SECRET, { expiresIn: '1800s' });
}

module.exports = router;