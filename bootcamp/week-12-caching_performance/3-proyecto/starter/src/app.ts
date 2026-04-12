import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import responseTime from 'response-time';
import { rateLimit } from 'express-rate-limit';
import { env } from './config/env';
import { prisma } from './lib/prisma';
import { redis } from './lib/redis';
import { authRouter } from './routes/auth.routes';
import { itemsRouter } from './routes/items.routes';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

// ─── Security middleware ───────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ─── Performance middleware ────────────────────────────────────────
// TODO: Verificar que compression está habilitado (threshold 1024 bytes, level 6)
app.use(compression({ threshold: 1024, level: 6 }));
app.use(responseTime());

// ─── Parsing ──────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// ─── Health check ─────────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      db: 'connected',
      redis: redis.status,
    });
  } catch {
    res.status(503).json({ status: 'degraded', db: 'error', redis: redis.status });
  }
});

// ─── API Routes ───────────────────────────────────────────────────
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/items', itemsRouter);

// ─── Error handler ────────────────────────────────────────────────
app.use(errorMiddleware);
