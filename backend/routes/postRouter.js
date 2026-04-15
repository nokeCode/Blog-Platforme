const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// CREATE
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

const {
  createPost,
  getPosts,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;