import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { authRouter } from './routes/auth.routes';
import { itemsRouter } from './routes/items.routes';
import { notificationsRouter } from './routes/notifications.routes';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

// Seguridad
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));

// Rate limiting en auth endpoints
app.use(
  '/api/v1/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Demasiadas peticiones, intenta de nuevo en 15 minutos' },
  }),
);

app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rutas
app.use('/api/v1/auth', authRouter);

// TODO: Registrar los routers de ítems y notificaciones
// app.use('/api/v1/items', itemsRouter);
// app.use('/api/v1/notifications', notificationsRouter);

// Manejo global de errores (siempre al final)
app.use(errorMiddleware);
