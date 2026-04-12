import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { authRouter, itemRouter } from './routes/item.routes';
import { swaggerSpec } from './config/swagger';

export const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI — ya montado para que el foco esté en los PASOS 1-3
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true },
  }),
);
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerSpec);
});

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/items', itemRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
