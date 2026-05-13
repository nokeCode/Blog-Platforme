const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET tous les posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET post par ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trouvé' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET posts en vedette
router.get('/featured/list', async (req, res) => {
  try {
    const featuredPosts = await Post.find({ featured: true }).limit(5);
    res.json(featuredPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET post hero (le plus récent en vedette)
router.get('/hero/featured', async (req, res) => {
  try {
    const heroPost = await Post.findOne({ featured: true }).sort({ createdAt: -1 });
    res.json(heroPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST créer un nouveau post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    excerpt: req.body.excerpt,
    image: req.body.image,
    author: req.body.author,
    readTime: req.body.readTime,
    featured: req.body.featured || false
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT mettre à jour un post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trouvé' });

    post.title = req.body.title || post.title;
    post.category = req.body.category || post.category;
    post.content = req.body.content || post.content;
    post.excerpt = req.body.excerpt || post.excerpt;
    post.image = req.body.image || post.image;
    post.author = req.body.author || post.author;
    post.readTime = req.body.readTime || post.readTime;
    post.featured = req.body.featured !== undefined ? req.body.featured : post.featured;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE supprimer un post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post non trouvé' });

    await post.deleteOne();
    res.json({ message: 'Post supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;