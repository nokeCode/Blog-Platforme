const Post = require('../models/Post');
const { asyncHandler } = require('../middleware/errorHandler');
const { cloudinary } = require('../config/cloudinary');

const AUTHOR_SELECT = 'name avatar';

// @desc  Get all published posts (with pagination, search, category filter)
// @route GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 9,
    category,
    search,
    sort = '-createdAt',
  } = req.query;

  const query = { published: true };

  if (category && category !== 'All') query.category = category;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('author', AUTHOR_SELECT)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    Post.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: posts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

// @desc  Get featured post (most recent isFeatured=true)
// @route GET /api/posts/featured
// @access Public
const getFeaturedPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ isFeatured: true, published: true })
    .populate('author', AUTHOR_SELECT)
    .sort('-createdAt');

  if (!post) {
    // fallback: return most recent post
    const fallback = await Post.findOne({ published: true })
      .populate('author', AUTHOR_SELECT)
      .sort('-createdAt');
    return res.json({ success: true, data: fallback });
  }

  res.json({ success: true, data: post });
});

// @desc  Get other featured posts (sidebar)
// @route GET /api/posts/featured/others
// @access Public
const getOtherFeatured = asyncHandler(async (req, res) => {
  const posts = await Post.find({ isFeatured: true, published: true })
    .populate('author', AUTHOR_SELECT)
    .sort('-createdAt')
    .limit(6)
    .select('title image slug');

  res.json({ success: true, data: posts });
});

// @desc  Get recent posts
// @route GET /api/posts/recent
// @access Public
const getRecentPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ published: true })
    .populate('author', AUTHOR_SELECT)
    .sort('-createdAt')
    .limit(3);

  res.json({ success: true, data: posts });
});

// @desc  Get single post by ID or slug
// @route GET /api/posts/:id
// @access Public
const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let post = await Post.findById(id).populate('author', AUTHOR_SELECT).catch(() => null);
  if (!post) {
    post = await Post.findOne({ slug: id }).populate('author', AUTHOR_SELECT);
  }

  if (!post) {
    return res.status(404).json({ success: false, message: 'Article introuvable' });
  }

  // Increment views
  post.views += 1;
  await post.save({ validateBeforeSave: false });

  res.json({ success: true, data: post });
});

// @desc  Create post
// @route POST /api/posts
// @access Private (author, admin)
const createPost = asyncHandler(async (req, res) => {
  const { title, excerpt, content, category, tags, isFeatured, published } = req.body;

  const postData = {
    title,
    excerpt,
    content,
    category,
    tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim())) : [],
    isFeatured: isFeatured === 'true' || isFeatured === true,
    published: published !== 'false' && published !== false,
    author: req.user._id,
  };

  // Handle image upload (from Cloudinary via multer)
  if (req.file) {
    postData.image = req.file.path;
    postData.imagePublicId = req.file.filename;
  }

  const post = await Post.create(postData);
  await post.populate('author', AUTHOR_SELECT);

  res.status(201).json({ success: true, data: post });
});

// @desc  Update post
// @route PUT /api/posts/:id
// @access Private (owner or admin)
const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Article introuvable' });
  }

  // Only owner or admin can update
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Non autorisé' });
  }

  const { title, excerpt, content, category, tags, isFeatured, published } = req.body;

  if (title) post.title = title;
  if (excerpt !== undefined) post.excerpt = excerpt;
  if (content !== undefined) post.content = content;
  if (category) post.category = category;
  if (tags) post.tags = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim());
  if (isFeatured !== undefined) post.isFeatured = isFeatured === 'true' || isFeatured === true;
  if (published !== undefined) post.published = published !== 'false' && published !== false;

  // Handle new image upload
  if (req.file) {
    // Delete old image from Cloudinary
    if (post.imagePublicId) {
      await cloudinary.uploader.destroy(post.imagePublicId).catch(() => {});
    }
    post.image = req.file.path;
    post.imagePublicId = req.file.filename;
  }

  await post.save();
  await post.populate('author', AUTHOR_SELECT);

  res.json({ success: true, data: post });
});

// @desc  Delete post
// @route DELETE /api/posts/:id
// @access Private (owner or admin)
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Article introuvable' });
  }

  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Non autorisé' });
  }

  // Delete image from Cloudinary
  if (post.imagePublicId) {
    await cloudinary.uploader.destroy(post.imagePublicId).catch(() => {});
  }

  await post.deleteOne();

  res.json({ success: true, message: 'Article supprimé' });
});

module.exports = {
  getPosts,
  getFeaturedPost,
  getOtherFeatured,
  getRecentPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
