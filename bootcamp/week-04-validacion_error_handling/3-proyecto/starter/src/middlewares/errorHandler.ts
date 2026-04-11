// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

// TODO: Implementar el errorHandler con exactamente 4 parámetros.
// ⚠️ Express detecta los error handlers por la cantidad de parámetros.
//    Con 3 parámetros lo trataría como middleware normal.
//
// Debe distinguir tres tipos de error:
//
// 1. ZodError → 400
//    { error: 'Validation Error', message: '...', issues: [{ field, message }] }
//
// 2. AppError → err.statusCode
//    { error: 'Application Error', message: err.message }
//    Usar logger.warn() para registrar errores operacionales
//
// 3. Error genérico → 500
//    { error: 'Internal Server Error', message: '...' }
//    Ocultar stack en producción, enviarlo en desarrollo
//    Usar logger.error() para registrar errores no controlados

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // TODO: implementa la distinción de errores aquí
  // Puedes usar el patrón:
  // if (err instanceof ZodError) { ... return; }
  // if (err instanceof AppError) { ... return; }
  // // Error genérico
  // const isProduction = process.env['NODE_ENV'] === 'production';

  logger.error('Unhandled error — implementa el errorHandler');
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'TODO: implementa el errorHandler',
  });
}
