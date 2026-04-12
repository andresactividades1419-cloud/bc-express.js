import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/lib/prisma';

// Clean up test user after each test
afterEach(async () => {
  await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /api/v1/auth/register', () => {
  it('201 — registers a new user and returns access token', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'Secret123!',
      name: 'Test User',
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.user).not.toHaveProperty('password');
    expect(res.headers['set-cookie']).toBeDefined(); // HttpOnly refresh cookie
  });

  it('409 — returns conflict when email already exists', async () => {
    await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'Secret123!',
      name: 'Test User',
    });

    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'Secret123!',
      name: 'Test User',
    });

    expect(res.status).toBe(409);
  });

  it('400 — returns validation error for weak password', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'short',
      name: 'Test User',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });
});

describe('POST /api/v1/auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'Secret123!',
      name: 'Test User',
    });
  });

  it('200 — returns access token with valid credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'Secret123!',
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('accessToken');
  });

  it('401 — returns error with invalid password', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});

describe('POST /api/v1/auth/logout', () => {
  it('204 — clears refresh token cookie', async () => {
    const loginRes = await request(app).post('/api/v1/auth/register').send({
      email: 'test@example.com',
      password: 'Secret123!',
      name: 'Test User',
    });

    const accessToken = loginRes.body.data.accessToken as string;

    const res = await request(app)
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(204);
  });

  it('401 — returns error without token', async () => {
    const res = await request(app).post('/api/v1/auth/logout');
    expect(res.status).toBe(401);
  });
});
