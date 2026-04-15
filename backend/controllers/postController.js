const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};