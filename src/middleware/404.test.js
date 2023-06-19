'use strict';
const { app } = require('../server');
const { db } = require('../auth/models/index');
const supertest = require('supertest');
const mockServer = supertest(app);

beforeAll(async () => {
    await db.sync();
});

describe('testing my server', () => {
   
    it('404 on a bad route', async () => {
        const response = await mockServer.get('/hi');
        expect(response.status).toBe(404);
    });
    
    it('should return 404 on a bad method', async () => {
    const response = await mockServer.post('/');
    expect(response.status).toBe(404);
    });
   
});

afterAll(async () => {
    await db.drop();
});