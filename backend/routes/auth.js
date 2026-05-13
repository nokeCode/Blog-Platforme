const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login, getMe, updateMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validation rules
const registerRules = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court (6 car. min)'),
];

const loginRules = [
  body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password').notEmpty().withMessage('Mot de passe requis'),
];

// Validation error handler
const validate = (req, res, next) => {
  const { validationResult } = require('express-validator');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
