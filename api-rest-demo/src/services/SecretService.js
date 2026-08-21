// src/services/secretService.js
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

class SecretService {
  constructor() {
    this._client = null;
  }

  get client() {
    if (!this._client) {
      const vaultUrl = process.env.KEY_VAULT_URI;
      if (!vaultUrl) {
        throw new Error('KEY_VAULT_URI no está configurada');
      }
      const credential = new DefaultAzureCredential();
      this._client = new SecretClient(vaultUrl, credential);
    }
    return this._client;
  }

  async getSecret(secretName) {
    try {
      const secret = await this.client.getSecret(secretName);
      return secret.value;
    } catch (error) {
      console.error(`Error al obtener el secreto ${secretName}:`, error.message);
      throw error;
    }
  }
}

module.exports = new SecretService();