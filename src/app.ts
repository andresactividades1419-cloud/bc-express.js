import express, { type Request, type Response, type NextFunction } from 'express';
import { eventsRouter } from './routes/events.routes.js';

export const app = express();

// 1. Middleware de Parseo de Body (JSON)
app.use(express.json());

// 2. Middleware de Logging Personalizado
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    console.log(`[HTTP Logger] ${new Date().toISOString()} | ${method} ${originalUrl} -> Status ${statusCode} (${duration}ms)`);
  });

  next();
});

// 3. Endpoint de Salud / Info
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    system: 'Productora de Eventos REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 4. Registro de Rutas del Dominio (events)
app.use('/api/v1/events', eventsRouter);

// 5. Middleware Manejador de Ruta No Encontrada (404 Handler)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `La ruta '${req.originalUrl}' con el método '${req.method}' no existe en la API de Productora de Eventos`
  });
});

// 6. Middleware Global Manejador de Errores (Error Handler Centralizado)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error Handler Centralizado]:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor en Productora de Eventos',
    message: err.message || 'Ocurrió un error inesperado al procesar la solicitud'
  });
});
