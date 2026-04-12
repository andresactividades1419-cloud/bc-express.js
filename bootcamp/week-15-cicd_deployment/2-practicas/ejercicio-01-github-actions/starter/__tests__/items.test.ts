import request from 'supertest';
import { app, resetItems } from '../src/app';

beforeEach(() => {
  resetItems();
});

describe('GET /health', () => {
  it('responde 200 con status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/items', () => {
  it('retorna lista de items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/items', () => {
  it('crea un item y retorna 201', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Keyboard', price: 75 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Keyboard');
    expect(res.body.id).toBeDefined();
  });

  it('retorna 400 si falta name', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ price: 10 });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/items/:id', () => {
  it('elimina un item existente y retorna 204', async () => {
    const res = await request(app).delete('/api/items/1');
    expect(res.status).toBe(204);
  });

  it('retorna 404 para item inexistente', async () => {
    const res = await request(app).delete('/api/items/9999');
    expect(res.status).toBe(404);
  });
});
