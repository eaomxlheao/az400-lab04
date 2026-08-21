// src/tests/integration/api.integration.test.js
const request = require('supertest');
const app = require('../../app');

describe('API Integration Tests', () => {
  describe('Health Check', () => {
    it('should return 200 and status OK', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Complete User Workflow', () => {
    let createdUserId;

    it('should create a new user', async () => {
      const newUser = {
        name: 'Integration Test User',
        email: 'integration@test.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);

      createdUserId = response.body.id;
    });

    it('should retrieve the created user', async () => {
      const response = await request(app).get(`/api/users/${createdUserId}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(createdUserId);
      expect(response.body.name).toBe('Integration Test User');
    });

    it('should update the created user', async () => {
      const updatedData = {
        name: 'Updated Integration User',
        email: 'updated.integration@test.com'
      };

      const response = await request(app)
        .put(`/api/users/${createdUserId}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
    });

    it('should delete the created user', async () => {
      const response = await request(app).delete(`/api/users/${createdUserId}`);
      expect(response.statusCode).toBe(204);
    });

    it('should return 404 for deleted user', async () => {
      const response = await request(app).get(`/api/users/${createdUserId}`);
      expect(response.statusCode).toBe(404);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid routes with 404', async () => {
      const response = await request(app).get('/api/nonexistent');
      expect(response.statusCode).toBe(404);
    });

    it('should handle invalid user data with 400', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Only Name' });
      
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});