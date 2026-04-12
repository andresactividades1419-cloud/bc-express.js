// src/app.ts
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import authRouter from './routes/auth.routes';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Week 10 - Email Exercise' });
});

app.use('/api/v1/auth', authRouter);

app.use(errorMiddleware);
