// src/app.ts — Configuración de la aplicación Express
// ============================================================
// TODO: Registrar el router de tu recurso
//
// 1. Importar el router: import itemsRouter from './routes/items.routes';
// 2. Registrarlo bajo la ruta correcta para tu dominio:
//    app.use('/api/v1/books', itemsRouter);    // Biblioteca
//    app.use('/api/v1/medications', itemsRouter); // Farmacia
//    app.use('/api/v1/members', itemsRouter);  // Gimnasio
//    (adapta según tu dominio)
// ============================================================

import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// TODO: importar y registrar tu router aquí
// import itemsRouter from './routes/items.routes';
// app.use('/api/v1/[nombre-recurso]', itemsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
