import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { authRouter } from './routes/auth.routes.js';
import { eventsRouter } from './routes/events.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Importar { app } en los tests — NUNCA server.ts

const corsOptions = {
  origin: (process.env['CORS_ORIGINS'] ?? '').split(',').filter(Boolean),
};

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(express.json());

// express-mongo-sanitize (v2, pensado para Express 4) intenta reasignar
// req.query, que en Express 5 es de solo lectura. Se redefine como
// escribible antes de aplicar el middleware.
app.use((req: Request, _res: Response, next: NextFunction) => {
  Object.defineProperty(req, 'query', {
    ...Object.getOwnPropertyDescriptor(req, 'query'),
    value: req.query,
    writable: true,
    configurable: true,
  });
  next();
});
app.use(mongoSanitize());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/events', eventsRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);
