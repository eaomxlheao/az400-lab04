// src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const secretRoutes = require('./routes/secrets');
const logger = require('./middleware/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/secrets', secretRoutes);

// Health check - ✅ DEBE incluir timestamp
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;