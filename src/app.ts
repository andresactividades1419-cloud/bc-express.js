import express from 'express';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from './config/logger.js';
import { authRouter } from './routes/auth.routes.js';
import { eventsRouter } from './routes/events.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

// Middlewares globales
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);

// Ruta de estado
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API v1
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/events', eventsRouter);

// Manejador de rutas no encontradas (404)
app.use(notFound);

// Manejador centralizado de errores
app.use(errorHandler);
