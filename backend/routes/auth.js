const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.use((req, res, next) => {
  console.log('DEBUG auth router:', req.method, req.path);
  next();
});

const emailRegex = /^\S+@\S+\.\S+$/;

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name?.trim()) {
    return res.status(400).json({ success: false, message: 'Le nom est requis' });
  }
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email invalide' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Mot de passe trop court (6 car. min)' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email invalide' });
  }
  if (!password) {
    return res.status(400).json({ success: false, message: 'Mot de passe requis' });
  }
  next();
};

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);

module.exports = router;
