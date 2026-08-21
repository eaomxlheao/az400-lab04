const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const logger = require('./middleware/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK' }));
module.exports = app;