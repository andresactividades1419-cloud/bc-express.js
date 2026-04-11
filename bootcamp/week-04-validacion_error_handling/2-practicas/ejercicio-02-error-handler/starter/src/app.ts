import express from 'express';
import productsRouter from './routes/products.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// 1. Middlewares generales
app.use(express.json());

// 2. Rutas
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/products', productsRouter);

// ============================================
// PASO 4 — Registrar notFound y errorHandler
// El orden es CRÍTICO. Descomenta las siguientes
// líneas y colócalas DESPUÉS de todas las rutas:
// ============================================
// 3. Rutas no encontradas (3 params — middleware normal)
// app.use(notFound);
//
// 4. Manejador global de errores (4 params — error handler)
// app.use(errorHandler);

// Suprime el warning de TypeScript para los imports no usados
// (puedes eliminarlas al descomentar arriba)
void notFound;
void errorHandler;

export default app;
