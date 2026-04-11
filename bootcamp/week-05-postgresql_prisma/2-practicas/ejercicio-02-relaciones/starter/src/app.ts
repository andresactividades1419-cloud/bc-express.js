// src/app.ts — Ejercicio 02
// PASO 5: Descomenta el import y el registro de categoriesRouter

import express from 'express';
import productsRouter from './routes/products.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

// ============================================================
// PASO 5: Descomenta las dos líneas de abajo
// ============================================================
// import categoriesRouter from './routes/categories.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/products', productsRouter);

// ============================================================
// PASO 5: Descomenta la línea de abajo
// ============================================================
// app.use('/api/v1/categories', categoriesRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
