// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-console': 'warn',       // Mantiene la advertencia general
    'no-unused-vars': 'error'
  },
  // ✅ AGREGAR ESTO: Excepciones para archivos específicos
  overrides: [
    {
      files: ['src/server.js', 'src/middleware/logger.js'],
      rules: {
        'no-console': 'off'     // Desactiva la regla en estos archivos
      }
    }
  ]
};