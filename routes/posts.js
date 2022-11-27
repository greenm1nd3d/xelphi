const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();

        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get all posts by given user id
router.get('/:id', async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.id })
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
