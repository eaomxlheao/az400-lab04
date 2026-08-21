// src/tests/users.test.js
const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/999');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'Test User',
        email: 'test@example.com'
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(newUser);
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should return 400 if name or email is missing', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User' });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update an existing user', async () => {
      const updatedData = { name: 'Updated Name' };
      
      const response = await request(app)
        .put('/api/users/1')
        .send(updatedData);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Updated Name');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app).delete('/api/users/2');
      expect(response.statusCode).toBe(204);
    });
  });
});