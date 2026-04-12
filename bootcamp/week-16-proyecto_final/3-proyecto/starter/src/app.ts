import './types'; // Ensure Express type extensions are loaded
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import { env } from './config/env';
import { logger } from './lib/logger';
import { prisma } from './lib/prisma';
import { errorHandler } from './middlewares/error.middleware';
import { router } from './routes';

export const app = express();

// ── Security middlewares ──────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true, // Allow cookies for refresh token
  }),
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
  }),
);

// ── Request parsing ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// ── HTTP request logging ──────────────────────────────────────────────────────
app.use(
  morgan('combined', {
    stream: { write: (msg: string) => logger.http(msg.trim()) },
    skip: () => env.NODE_ENV === 'test',
  }),
);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      db: 'connected',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/v1', router);

// ── Global error handler (must be last) ──────────────────────────────────────
app.use(errorHandler);
