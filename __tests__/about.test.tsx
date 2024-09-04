import request from 'supertest';
import handler from '../pages/api/about';

describe('API Route /api/about', () => {
  it('should fetch all records', async () => {
    const res = await request(handler).get('/api/about');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new record', async () => {
    const newRecord = { title: 'New Title', introduction: 'New Intro' };
    const res = await request(handler).post('/api/about').send(newRecord);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newRecord.title);
  });

  // Add more tests for PUT, DELETE, etc.
});