// ============================================
// APP — configuración de Express
// Registra middlewares, rutas y manejo de errores
// en el ORDEN CORRECTO.
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger';
import itemsRouter from './routes/items.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// TODO: 1. Registrar middlewares generales
//   app.use(express.json());
//   app.use(morganMiddleware);
app.use(express.json());
app.use(morganMiddleware);

// Health check — no requiere cambios
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// TODO: 2. Registrar rutas del dominio
//   app.use('/api/v1/items', itemsRouter);
//   (cambia 'items' por el nombre del recurso de tu dominio)
app.use('/api/v1/items', itemsRouter);

// TODO: 3. Registrar notFound DESPUÉS de todas las rutas
//   app.use(notFound);
app.use(notFound);

// TODO: 4. Registrar errorHandler como ÚLTIMO middleware (4 params)
//   app.use(errorHandler);
app.use(errorHandler);

export default app;
