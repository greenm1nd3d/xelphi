//const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const User = require('../models/User')
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/profile', userController.profile);

/*
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.id });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:id', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id },
            { $set: {
                fname: req.body.fname,
                lname: req.body.lname,
                alias: req.body.alias,
                email: req.body.email,
                password: password
            } }
        );
        res.json(updatedUser);
    } catch (err) {
        console.log("shit");
        res.json({ message: err });
    }
});
*/
module.exports = router;
