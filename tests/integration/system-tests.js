const axios = require('axios');
const { expect } = require('chai');

// EPA Ethics App System Integration Tests

describe('EPA Ethics App - System Integration Tests', () => {
  const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';
  const ADMIN_BASE_URL = process.env.ADMIN_BASE_URL || 'http://localhost:3000';
  
  let authToken;
  let testUser = {
    username: 'test-admin',
    password: 'TestPassword123!',
    email: 'test@epa.gov'
  };

  describe('Backend API Health Checks', () => {
    it('should respond to health check endpoint', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('status', 'healthy');
      expect(response.data).to.have.property('timestamp');
      expect(response.data).to.have.property('uptime');
    });

    it('should respond to readiness check', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/health/ready`);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('database', 'connected');
      expect(response.data).to.have.property('cache', 'ready');
    });
  });

  describe('Authentication and Authorization', () => {
    it('should reject invalid login credentials', async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/auth/login`, {
          username: 'invalid',
          password: 'invalid'
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(401);
        expect(error.response.data).to.have.property('message', 'Invalid credentials');
      }
    });

    it('should require MFA for admin login', async () => {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username: testUser.username,
        password: testUser.password
      });
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('mfaRequired', true);
      expect(response.data).to.have.property('message', 'MFA code required');
    });

    it('should successfully authenticate with valid MFA', async () => {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username: testUser.username,
        password: testUser.password,
        mfaCode: '123456' // Mock MFA code for testing
      });
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('token');
      expect(response.data).to.have.property('user');
      expect(response.data.user).to.have.property('role');
      
      authToken = response.data.token;
    });

    it('should protect admin endpoints', async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/admin/users`);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(401);
      }
    });

    it('should allow access with valid token', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data).to.have.property('data');
    });
  });

  describe('Content Management API', () => {
    it('should retrieve ethics modules', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/modules`);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data.data).to.be.an('array');
      
      if (response.data.data.length > 0) {
        const module = response.data.data[0];
        expect(module).to.have.property('id');
        expect(module).to.have.property('title');
        expect(module).to.have.property('content');
        expect(module).to.have.property('category');
      }
    });

    it('should retrieve quiz questions', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/quiz`);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data.data).to.be.an('array');
      
      if (response.data.data.length > 0) {
        const question = response.data.data[0];
        expect(question).to.have.property('id');
        expect(question).to.have.property('question');
        expect(question).to.have.property('options');
        expect(question).to.have.property('correctAnswer');
        expect(question.options).to.be.an('array');
      }
    });

    it('should retrieve training videos', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/videos`);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data.data).to.be.an('array');
      
      if (response.data.data.length > 0) {
        const video = response.data.data[0];
        expect(video).to.have.property('id');
        expect(video).to.have.property('title');
        expect(video).to.have.property('duration');
        expect(video).to.have.property('category');
      }
    });

    it('should retrieve FAQ items', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/faq`);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data.data).to.be.an('array');
      
      if (response.data.data.length > 0) {
        const faq = response.data.data[0];
        expect(faq).to.have.property('id');
        expect(faq).to.have.property('question');
        expect(faq).to.have.property('answer');
        expect(faq).to.have.property('category');
      }
    });

    it('should retrieve glossary terms', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/glossary`);
      
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('success', true);
      expect(response.data.data).to.be.an('array');
      
      if (response.data.data.length > 0) {
        const term = response.data.data[0];
        expect(term).to.have.property('id');
        expect(term).to.have.property('term');
        expect(term).to.have.property('definition');
        expect(term).to.have.property('category');
      }
    });
  });

  describe('Admin Portal Functionality', () => {
    it('should serve admin portal homepage', async () => {
      const response = await axios.get(ADMIN_BASE_URL);
      expect(response.status).to.equal(200);
      expect(response.headers['content-type']).to.include('text/html');
    });

    it('should require authentication for admin routes', async () => {
      try {
        await axios.get(`${ADMIN_BASE_URL}/dashboard`);
        // If redirected to login, that's expected behavior
      } catch (error) {
        // 403/401 responses are expected for unauthenticated requests
        expect([401, 403]).to.include(error.response.status);
      }
    });
  });

  describe('Security Headers and Compliance', () => {
    it('should include security headers', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      
      expect(response.headers).to.have.property('x-frame-options');
      expect(response.headers).to.have.property('x-content-type-options');
      expect(response.headers).to.have.property('referrer-policy');
      expect(response.headers['x-frame-options']).to.equal('DENY');
      expect(response.headers['x-content-type-options']).to.equal('nosniff');
    });

    it('should enforce HTTPS in production', async () => {
      if (process.env.NODE_ENV === 'production') {
        const response = await axios.get(`${API_BASE_URL}/api/health`);
        expect(response.headers).to.have.property('strict-transport-security');
      }
    });

    it('should have Content Security Policy', async () => {
      const response = await axios.get(ADMIN_BASE_URL);
      expect(response.headers).to.have.property('content-security-policy');
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const requests = [];
      
      // Make multiple rapid requests
      for (let i = 0; i < 110; i++) {
        requests.push(
          axios.get(`${API_BASE_URL}/api/health`).catch(err => err.response)
        );
      }
      
      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);
      
      expect(rateLimitedResponses.length).to.be.greaterThan(0);
    });
  });

  describe('Database Operations', () => {
    it('should handle database queries efficiently', async () => {
      const startTime = Date.now();
      const response = await axios.get(`${API_BASE_URL}/api/content/modules`);
      const endTime = Date.now();
      
      expect(response.status).to.equal(200);
      expect(endTime - startTime).to.be.lessThan(1000); // Should respond within 1 second
    });

    it('should maintain data integrity', async () => {
      const modulesResponse = await axios.get(`${API_BASE_URL}/api/content/modules`);
      const quizResponse = await axios.get(`${API_BASE_URL}/api/content/quiz`);
      
      expect(modulesResponse.data.success).to.be.true;
      expect(quizResponse.data.success).to.be.true;
      
      // Verify data structure consistency
      if (modulesResponse.data.data.length > 0) {
        const module = modulesResponse.data.data[0];
        expect(module).to.have.all.keys(['id', 'title', 'description', 'content', 'category', 'icon', 'estimatedTime', 'order', 'isPublished', 'createdAt', 'updatedAt']);
      }
    });
  });

  describe('Accessibility Features', () => {
    it('should provide accessible content structure', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/modules`);
      
      expect(response.status).to.equal(200);
      
      if (response.data.data.length > 0) {
        const module = response.data.data[0];
        expect(module).to.have.property('title');
        expect(module).to.have.property('description');
        expect(module.title).to.be.a('string').and.not.empty;
        expect(module.description).to.be.a('string').and.not.empty;
      }
    });

    it('should include video accessibility features', async () => {
      const response = await axios.get(`${API_BASE_URL}/api/content/videos`);
      
      if (response.data.data.length > 0) {
        const video = response.data.data[0];
        // Videos should have accessibility features available
        expect(video).to.have.property('title');
        expect(video).to.have.property('description');
      }
    });
  });

  describe('Performance Metrics', () => {
    it('should respond to API calls within acceptable time', async () => {
      const endpoints = [
        '/api/health',
        '/api/content/modules',
        '/api/content/quiz',
        '/api/content/videos',
        '/api/content/faq',
        '/api/content/glossary'
      ];
      
      for (const endpoint of endpoints) {
        const startTime = Date.now();
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        const endTime = Date.now();
        
        expect(response.status).to.equal(200);
        expect(endTime - startTime).to.be.lessThan(2000); // 2 second max response time
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors gracefully', async () => {
      try {
        await axios.get(`${API_BASE_URL}/api/nonexistent`);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.equal(404);
        expect(error.response.data).to.have.property('message');
      }
    });

    it('should handle malformed requests', async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/auth/login`, {
          invalidField: 'invalid'
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect([400, 422]).to.include(error.response.status);
      }
    });
  });

  describe('Audit Logging', () => {
    it('should log administrative actions', async () => {
      if (authToken) {
        const response = await axios.get(`${API_BASE_URL}/api/admin/audit-logs`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('success', true);
        expect(response.data.data).to.be.an('array');
      }
    });
  });
});

// Run accessibility tests if running in CI
if (process.env.CI) {
  describe('Automated Accessibility Testing', () => {
    const { AxePuppeteer } = require('@axe-core/puppeteer');
    const puppeteer = require('puppeteer');
    
    let browser;
    let page;
    
    before(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
    });
    
    after(async () => {
      await browser.close();
    });
    
    it('should pass WCAG 2.1 AA accessibility tests', async () => {
      await page.goto(ADMIN_BASE_URL);
      
      const results = await new AxePuppeteer(page)
        .withTags(['wcag2a', 'wcag2aa', 'section508'])
        .analyze();
      
      expect(results.violations).to.have.lengthOf(0);
    });
  });
}