import request from 'supertest';
import { app } from '../src/app';

// Tests del health check y estructura básica de la API
describe('GET /health', () => {
  it('retorna 200 con status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

// ============================================================
// TODO: Agrega tests para tu dominio (mínimo 5 assertions)
// ============================================================
//
// Ejemplo para dominio Biblioteca:
// describe('GET /api/v1/books', () => {
//   it('retorna lista vacía inicialmente', async () => {
//     const res = await request(app).get('/api/v1/books');
//     expect(res.status).toBe(200);
//     expect(res.body.data).toBeInstanceOf(Array);
//   });
// });
//
// describe('POST /api/v1/books', () => {
//   it('crea un libro con datos válidos', async () => {
//     const res = await request(app).post('/api/v1/books').send({
//       title: 'El Quijote',
//       author: 'Cervantes',
//     });
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty('id');
//   });
//
//   it('retorna 400 con datos inválidos', async () => {
//     const res = await request(app).post('/api/v1/books').send({});
//     expect(res.status).toBe(400);
//   });
// });
