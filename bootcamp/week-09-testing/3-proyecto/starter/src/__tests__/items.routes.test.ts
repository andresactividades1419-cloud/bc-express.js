// ============================================================
// INTEGRATION TESTS — items routes
// ============================================================
// Testear el ciclo completo con Supertest + MongoDB Memory Server
// Adaptar rutas y assertions al dominio asignado
// ============================================================

import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';

// import { MongoMemoryServer } from 'mongodb-memory-server';

// ── Setup (copiar del ejercicio 02 y adaptar) ──
//
// let mongod: MongoMemoryServer;
// let userToken: string;
// let adminToken: string;
//
// beforeAll(async () => {
//   mongod = await MongoMemoryServer.create();
//   await mongoose.connect(mongod.getUri());
//
//   // Crear usuario normal
//   await request(app)
//     .post('/api/v1/auth/register')
//     .send({ name: 'User', email: 'user@test.com', password: 'Password1!' });
//   const userLogin = await request(app)
//     .post('/api/v1/auth/login')
//     .send({ email: 'user@test.com', password: 'Password1!' });
//   userToken = userLogin.body.accessToken;
// });
//
// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
// });
//
// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongod.stop();
// });

// ── Tests (adaptar ruta base al dominio) ──

describe('Items Routes — Integration Tests', () => {
  // TODO: Adaptar la ruta base al dominio asignado
  // '/api/v1/items' → '/api/v1/books' en Biblioteca
  // '/api/v1/items' → '/api/v1/medicines' en Farmacia

  describe('GET /api/v1/items', () => {
    // TODO: Testear listado público
    // it('should return 200 and empty array initially', async () => { ... });
  });

  describe('POST /api/v1/items', () => {
    // TODO: Testear creación con auth
    // it('should return 201 with valid data and token', async () => { ... });
    // it('should return 401 without token', async () => { ... });
    // it('should return 422 with invalid data', async () => { ... });
  });

  describe('GET /api/v1/items/:id', () => {
    // TODO: Testear obtener por ID
    // it('should return 200 with existing item', async () => { ... });
    // it('should return 404 with non-existent ID', async () => { ... });
  });

  describe('PUT /api/v1/items/:id', () => {
    // TODO: Testear actualización
    // it('should return 200 when owner updates', async () => { ... });
    // it('should return 403 when non-owner tries to update', async () => { ... });
  });

  describe('DELETE /api/v1/items/:id', () => {
    // TODO: Testear eliminación
    // it('should return 204 when owner deletes', async () => { ... });
    // it('should return 403 when non-owner tries to delete', async () => { ... });
  });
});

export {};
