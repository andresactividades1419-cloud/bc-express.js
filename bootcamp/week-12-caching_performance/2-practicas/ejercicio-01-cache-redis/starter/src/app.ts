import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { productRouter } from './routes/product.routes';
import { redis } from './lib/redis';

const app = express();

app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());

// Health check — muestra estado de Redis
app.get('/health', async (_req, res) => {
  const redisStatus = redis.status === 'ready' ? 'connected' : redis.status;
  res.json({ status: 'ok', redis: redisStatus, timestamp: new Date().toISOString() });
});

app.use('/api/v1/products', productRouter);

// Error handler
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { app };
