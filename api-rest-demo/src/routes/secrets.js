// src/routes/secrets.js
const express = require('express');
const router = express.Router();
const secretService = require('../services/secretService');

router.get('/health', async (req, res) => {
  try {
    const testSecret = await secretService.getSecret('ExternalApiSecret');
    
    res.json({
      status: 'OK',
      keyVaultConnected: true,
      timestamp: new Date().toISOString(),
      secretExists: !!testSecret,
      secretLength: testSecret ? testSecret.length : 0
    });
  } catch (error) {
    console.error('Error completo:', error);
    
    res.status(500).json({
      status: 'ERROR',
      keyVaultConnected: false,
      error: 'No se pudo conectar a Key Vault',
      errorDetails: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;