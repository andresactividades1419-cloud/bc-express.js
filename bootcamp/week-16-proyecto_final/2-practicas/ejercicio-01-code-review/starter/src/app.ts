import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { productRouter } from './routes/products';

export const app = express();

// ── Body parsing ──────────────────────────────────────────────────
app.use(express.json());

// ============================================================
// PASO 3: Seguridad HTTP
// ============================================================
// El código siguiente agrega Helmet, CORS y Rate Limiting.
// Sin estas cabeceras la API es vulnerable.
// Descomenta el bloque:
// ============================================================

// import helmet from 'helmet';
// import cors from 'cors';
// import rateLimit from 'express-rate-limit';
//
// app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }));
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ── Routes ────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/products', productRouter);

// ============================================================
// PASO 2: Error handler global
// ============================================================
// Sin esto, Prisma lanza errores con stack trace HTML.
// Descomenta el bloque:
// ============================================================

// import { AppError } from './errors/app-error';
// import { Prisma } from '@prisma/client';
//
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   if (err instanceof AppError) {
//     return res.status(err.statusCode).json({ error: err.message, statusCode: err.statusCode });
//   }
//   if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
//     return res.status(404).json({ error: 'Resource not found', statusCode: 404 });
//   }
//   console.error('Unhandled error:', err);
//   return res.status(500).json({ error: 'Internal server error', statusCode: 500 });
// });
