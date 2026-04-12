// src/app.ts
import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import usersRouter from './routes/users.routes';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Week 10 - File Uploads Exercise' });
});

app.use('/api/v1/users', usersRouter);

// El error middleware DEBE ser el último middleware registrado
app.use(errorMiddleware);
