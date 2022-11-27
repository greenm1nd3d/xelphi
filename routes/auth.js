const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const schema = Joi.object({
    name: Joi.string()
        .min(2)
        .required(),
    email: Joi.string()
        .min(7)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .required(),
});

router.post('/register', async (req, res) => {
    const validation = schema.validate(req.body);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = {
        email: email,
        password: password
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
    });
    next();
}


module.exports = router;
