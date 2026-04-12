import express from 'express';
import cors from 'cors';
import { articleRouter } from './routes/article.routes';
import { prisma } from './lib/prisma';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.use('/api/v1/articles', articleRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { app };
