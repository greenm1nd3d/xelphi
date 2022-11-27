const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// Create new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    });

    try {
        const createdPost = await post.save();
        res.json(createdPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Retrieve post with given id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete post with given id
router.delete('/:id', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.id });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update post with given id
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.id },
            { $set: {
                title: req.body.title,
                content: req.body.content
            } }
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
