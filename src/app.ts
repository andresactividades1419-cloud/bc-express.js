import 'dotenv/config';
import express from 'express';
import { morganMiddleware } from './config/logger';
import clientsRouter from './routes/clients.routes';
import eventsRouter from './routes/events.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    week: '06',
    project: 'mongodb-mongoose-orm',
  });
});

app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/events', eventsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
