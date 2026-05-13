require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// ─── Connect to MongoDB Atlas ─────────────────────────────
connectDB();

const app = express();

// ─── Security & Parsing ───────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Rate Limiting ────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { success: false, message: 'Trop de requêtes, réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Trop de tentatives de connexion, réessayez dans 15 minutes.' },
});

app.use('/api', limiter);
app.use('/api/auth', authLimiter);

// ─── Routes ───────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// ─── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Blog Platform API is running 🚀',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} introuvable` });
});

// ─── Global error handler ─────────────────────────────────
app.use(errorHandler);

// ─── Start server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📄 Environnement : ${process.env.NODE_ENV || 'development'}`);
});
