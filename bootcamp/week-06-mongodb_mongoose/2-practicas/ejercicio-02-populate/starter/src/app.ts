// ============================================
// PASO 5: Registrar el router de categorías
// ============================================
//
// Para que los endpoints de categories funcionen,
// debes montar el router en Express.
//
// Descomenta las líneas marcadas como PASO 5:

import express from 'express';
import productsRouter from './routes/products.routes';
// import categoriesRouter from './routes/categories.routes';  // PASO 5: importar
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/products',   productsRouter);
// app.use('/api/v1/categories', categoriesRouter);  // PASO 5: registrar router

app.use(notFound);
app.use(errorHandler);
