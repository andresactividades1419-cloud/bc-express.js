// ============================================
// app.ts — Configuración de Express
// TODO: Actualizar las rutas según tu dominio
// ============================================
//
// Cambia los segmentos de URL a los nombres de tu dominio:
// Ejemplo para Biblioteca:
//   /api/v1/authors   y   /api/v1/books
// Ejemplo para Farmacia:
//   /api/v1/suppliers y   /api/v1/medicines

import express from 'express';
import secondaryRouter from './routes/secondary.routes';
import primaryRouter from './routes/primary.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// TODO: Cambiar las URLs a los nombres de tu dominio
app.use('/api/v1/secondary', secondaryRouter);  // ej: /api/v1/authors
app.use('/api/v1/primary',   primaryRouter);     // ej: /api/v1/books

app.use(notFound);
app.use(errorHandler);
