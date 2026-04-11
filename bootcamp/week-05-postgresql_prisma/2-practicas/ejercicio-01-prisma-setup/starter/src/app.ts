// src/app.ts — Configuración de Express: middlewares y rutas

import express from 'express';
import productsRouter from './routes/products.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

// Middlewares de parseo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rutas del negocio
app.use('/api/v1/products', productsRouter);

// Ruta no encontrada (debe ir antes del errorHandler)
app.use(notFound);

// Manejo global de errores (debe ser el último middleware)
app.use(errorHandler);

export { app };
