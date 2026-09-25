import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app.js';
import { UserModel } from '../models/user.model.js';
import { EventModel } from '../models/event.model.js';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await UserModel.deleteMany({});
  await EventModel.deleteMany({});
});

async function registerAndLogin(email: string, role: 'user' | 'admin' = 'user') {
  await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email,
    password: 'Secret123',
  });
  if (role === 'admin') {
    await UserModel.updateOne({ email }, { role: 'admin' });
  }
  const loginRes = await request(app).post('/api/auth/login').send({
    email,
    password: 'Secret123',
  });
  return loginRes.body.accessToken as string;
}

const sampleEvent = {
  name: 'Festival Neon Lights 2026',
  code: 'FNL2026',
  category: 'festival',
  price: 250000,
  capacity: 18000,
  location: 'Parque Simón Bolívar, Bogotá',
  date: '2026-11-15',
};

describe('Events routes', () => {
  describe('GET /api/events', () => {
    it('returns 200 and an empty list when there are no events', async () => {
      const res = await request(app).get('/api/events');
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe('POST /api/events', () => {
    it('returns 401 when no token is provided', async () => {
      const res = await request(app).post('/api/events').send(sampleEvent);
      expect(res.status).toBe(401);
    });

    it('returns 201 and creates the event when authenticated', async () => {
      const token = await registerAndLogin('creador@example.com');

      const res = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(sampleEvent);

      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({ name: sampleEvent.name, code: sampleEvent.code });
    });

    it('returns 422 when the payload is invalid', async () => {
      const token = await registerAndLogin('creador2@example.com');

      const res = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'X' });

      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/events/:id', () => {
    it('returns 404 for a non-existent event', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).get(`/api/events/${fakeId}`);
      expect(res.status).toBe(404);
    });
  });

  describe('PATCH /api/events/:id', () => {
    it('allows the owner to update the event', async () => {
      const token = await registerAndLogin('owner@example.com');
      const createRes = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(sampleEvent);
      const eventId = createRes.body.data._id;

      const res = await request(app)
        .patch(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Festival Neon Lights - Edición Especial' });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Festival Neon Lights - Edición Especial');
    });

    it('returns 403 when a different non-admin user tries to update', async () => {
      const ownerToken = await registerAndLogin('owner2@example.com');
      const intruderToken = await registerAndLogin('intruder@example.com');
      const createRes = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send(sampleEvent);
      const eventId = createRes.body.data._id;

      const res = await request(app)
        .patch(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${intruderToken}`)
        .send({ name: 'Hackeado' });

      expect(res.status).toBe(403);
    });

    it('allows an admin to update an event they do not own', async () => {
      const ownerToken = await registerAndLogin('owner3@example.com');
      const adminToken = await registerAndLogin('admin1@example.com', 'admin');
      const createRes = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send(sampleEvent);
      const eventId = createRes.body.data._id;

      const res = await request(app)
        .patch(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Ajustado por administración' });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Ajustado por administración');
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('allows the owner to delete the event', async () => {
      const token = await registerAndLogin('deleter@example.com');
      const createRes = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(sampleEvent);
      const eventId = createRes.body.data._id;

      const res = await request(app)
        .delete(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(204);
    });

    it('returns 403 when a different non-admin user tries to delete', async () => {
      const ownerToken = await registerAndLogin('owner4@example.com');
      const intruderToken = await registerAndLogin('intruder2@example.com');
      const createRes = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${ownerToken}`)
        .send(sampleEvent);
      const eventId = createRes.body.data._id;

      const res = await request(app)
        .delete(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${intruderToken}`);

      expect(res.status).toBe(403);
    });
  });
});

describe('Auth routes', () => {
  describe('POST /api/auth/register', () => {
    it('returns 201 for a valid registration', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Andres Fernandez',
        email: 'nuevo@example.com',
        password: 'Secret123',
      });
      expect(res.status).toBe(201);
      expect(res.body.data).not.toHaveProperty('password');
    });

    it('returns 409 when the email is already registered', async () => {
      await request(app).post('/api/auth/register').send({
        name: 'Andres Fernandez',
        email: 'duplicado@example.com',
        password: 'Secret123',
      });
      const res = await request(app).post('/api/auth/register').send({
        name: 'Andres Fernandez',
        email: 'duplicado@example.com',
        password: 'Secret123',
      });
      expect(res.status).toBe(409);
    });

    it('returns 422 for an invalid payload', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'A',
        email: 'no-es-un-email',
        password: '123',
      });
      expect(res.status).toBe(422);
    });
  });

  describe('POST /api/auth/login', () => {
    it('returns an access token for valid credentials', async () => {
      await request(app).post('/api/auth/register').send({
        name: 'Andres Fernandez',
        email: 'login@example.com',
        password: 'Secret123',
      });
      const res = await request(app).post('/api/auth/login').send({
        email: 'login@example.com',
        password: 'Secret123',
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
    });

    it('returns 401 for invalid credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'noexiste@example.com',
        password: 'Secret123',
      });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/auth/me', () => {
    it('returns 401 without a token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
    });

    it('returns the authenticated user profile', async () => {
      const token = await registerAndLogin('perfil@example.com');
      const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({ email: 'perfil@example.com' });
    });
  });
});

describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
