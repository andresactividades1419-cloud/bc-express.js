// ============================================
// APP — Configuración de Express
// Registra middlewares, rutas y manejo de errores
// en el ORDEN CORRECTO.
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger';
import eventsRouter from './routes/events.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// 1. Middlewares generales
app.use(express.json());
app.use(morganMiddleware);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '04', project: 'validacion-errores-logging' });
});

// 2. Rutas del dominio
app.use('/api/v1/events', eventsRouter);

// 3. Middleware 404 (DESPUÉS de todas las rutas)
app.use(notFound);

// 4. Manejador global de errores (ÚLTIMO middleware, 4 parámetros)
app.use(errorHandler);

export default app;
