import express from 'express';
import cors from 'cors';
import { env } from './config/env';

export const app = express();

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Health check — confirma que el servidor HTTP funciona
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
