// ============================================
// APP — Configuración Express
// ============================================
import express from 'express';
import { eventsRouter } from './routes/events.routes';
import { ErrorResponse } from './types';

const app = express();

app.use(express.json());

// Endpoint de salud del servicio
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '03', project: 'api-arquitectura' });
});

// Enrutador de recursos del dominio
app.use('/api/v1/events', eventsRouter);

// Manejador centralizado de errores
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message);
  const response: ErrorResponse = {
    error: 'Internal Server Error',
    message: err.message,
  };
  res.status(500).json(response);
});

export default app;
