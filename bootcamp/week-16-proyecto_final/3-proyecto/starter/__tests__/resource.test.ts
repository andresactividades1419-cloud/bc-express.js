import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/lib/prisma';

// ============================================================
// TODO 7: Escribir tests de integración para tu recurso
// ============================================================
// Sigue el patrón del archivo auth.test.ts como referencia.
// Mínimo 5 tests que cubran:
//   - GET / (listar recursos, con y sin paginación)
//   - GET /:id (encontrado y no encontrado)
//   - POST / (creación exitosa y fallo de validación)
//   - PATCH /:id (actualización exitosa y no autorizado)
//   - DELETE /:id (solo ADMIN puede eliminar)
// ============================================================

// Helpers — create authenticated users for tests
let userToken: string;
let adminToken: string;

beforeAll(async () => {
  // TODO: Create USER and ADMIN accounts via the API or prisma directly
  // const userRes = await request(app)
  //   .post('/api/v1/auth/register')
  //   .send({ email: 'user@test.com', password: 'Secret123!', name: 'Test User' });
  // userToken = userRes.body.data.accessToken;
  //
  // const adminUser = await prisma.user.update({ ... set role: 'ADMIN' ... });
  // const adminRes = await request(app)
  //   .post('/api/v1/auth/login')
  //   .send({ email: 'admin@test.com', password: 'Secret123!' });
  // adminToken = adminRes.body.data.accessToken;
});

afterAll(async () => {
  // TODO: Clean up test data
  // await prisma.resource.deleteMany({ where: { ... } });
  // await prisma.user.deleteMany({ where: { email: { in: ['user@test.com', 'admin@test.com'] } } });
  await prisma.$disconnect();
});

// TODO: Rename /resources to your domain entity
describe('GET /api/v1/resources', () => {
  it.todo('200 — returns paginated list of resources');
  it.todo('200 — respects page and limit query params');
});

describe('GET /api/v1/resources/:id', () => {
  it.todo('200 — returns a single resource by id');
  it.todo('404 — returns error for non-existent id');
});

describe('POST /api/v1/resources', () => {
  it.todo('201 — authenticated user creates a resource');
  it.todo('400 — returns validation error for missing required fields');
  it.todo('401 — unauthenticated request is rejected');
});

describe('PATCH /api/v1/resources/:id', () => {
  it.todo('200 — authenticated user updates their resource');
  it.todo('404 — returns error when resource not found');
});

describe('DELETE /api/v1/resources/:id', () => {
  it.todo('204 — ADMIN can delete a resource');
  it.todo('403 — regular USER cannot delete');
  it.todo('401 — unauthenticated request is rejected');
});
