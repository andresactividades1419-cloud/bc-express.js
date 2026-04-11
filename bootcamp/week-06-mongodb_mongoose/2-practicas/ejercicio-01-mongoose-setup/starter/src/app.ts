import express from 'express';
import productsRouter from './routes/products.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandler);
