import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { itemsRouter } from './routes/items.routes.js';

export function createApp(): Application {
  const app = express();

  // TODO: Registrar middleware en este orden exacto:
  //
  // 1. express.json() — parseo de body (requerido para POST/PUT)
  // app.use(express.json());
  //
  // 2. Logger personalizado — loggear todas las peticiones
  // app.use((req, res, next) => {
  //   TODO: implementar logger similar al ejercicio-02
  // });
  //
  // 3. Health check (no requiere middleware especial)
  // app.get('/health', (_req, res) => { res.json({ status: 'ok' }); });
  //
  // 4. Rutas del recurso principal
  // app.use('/api/v1/items', itemsRouter);
  //
  // 5. Handler para rutas no encontradas (404)
  // app.use((_req, res) => {
  //   res.status(404).json({ error: 'Route not found' });
  // });
  //
  // 6. Error handler global — SIEMPRE el último app.use()
  // app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  //   TODO: implementar error handler
  // });

  return app;
}
