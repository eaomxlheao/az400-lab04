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
    'no-console': 'warn',
    'no-unused-vars': 'error'
  },
  overrides: [
    {
      files: ['src/server.js', 'src/middleware/logger.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
};