import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

import { authRouter } from './routes/auth.routes';
import { itemsRouter } from './routes/items.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { swaggerSpec } from './config/swagger';

export const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting on auth routes
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });

// ============================================================
// TODO: Montar Swagger UI
// ============================================================
// Descomenta el bloque completo a continuación.
//
// import swaggerUi from 'swagger-ui-express';
//
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     swaggerOptions: { persistAuthorization: true },
//   }),
// );
//
// app.get('/api-docs.json', (_req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.json(swaggerSpec);
// });

// API routes
app.use('/api/v1/auth',  authLimiter, authRouter);
app.use('/api/v1/items', itemsRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use(errorMiddleware);
