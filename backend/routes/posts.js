const express = require('express');
const router = express.Router();
const {
  getPosts,
  getFeaturedPost,
  getOtherFeatured,
  getRecentPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// ─── Public routes ────────────────────────────────────────
router.get('/', getPosts);
router.get('/featured', getFeaturedPost);
router.get('/featured/others', getOtherFeatured);
router.get('/recent', getRecentPosts);
router.get('/:id', getPostById);

// ─── Protected routes ─────────────────────────────────────
router.post(
  '/',
  protect,
  authorize('author', 'admin'),
  upload.single('image'),
  createPost
);

router.put(
  '/:id',
  protect,
  authorize('author', 'admin'),
  upload.single('image'),
  updatePost
);

router.delete('/:id', protect, authorize('author', 'admin'), deletePost);

module.exports = router;
