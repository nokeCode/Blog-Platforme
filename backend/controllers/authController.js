const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// Generate JWT
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

// @desc  Register a new user
// @route POST /api/auth/register
// @access Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email déjà utilisé' });
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: user.toSafeObject(),
  });
});

// @desc  Login user
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: user.toSafeObject(),
  });
});

// @desc  Get current user
// @route GET /api/auth/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, user: user.toSafeObject() });
});

// @desc  Update profile
// @route PUT /api/auth/me
// @access Private
const updateMe = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, bio, avatar },
    { new: true, runValidators: true }
  );
  res.json({ success: true, user: user.toSafeObject() });
});

module.exports = { register, login, getMe, updateMe };
