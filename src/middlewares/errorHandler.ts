import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. Errores de validación declarativa de Zod
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    logger.warn(`Validación fallida en ${req.method} ${req.originalUrl}: ${JSON.stringify(issues)}`);

    res.status(400).json({
      error: 'Validation Error',
      message: 'Datos de entrada inválidos',
      issues,
    });
    return;
  }

  // 2. Errores operacionales controlados (AppError)
  if (err instanceof AppError) {
    logger.warn(`AppError (${err.statusCode}): ${err.message}`);

    res.status(err.statusCode).json({
      error: err.statusCode === 404 ? 'Not Found' : err.statusCode === 409 ? 'Conflict' : 'Client Error',
      message: err.message,
    });
    return;
  }

  // 3. Errores no controlados (500 Internal Server Error)
  const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
  const errorStack = err instanceof Error ? err.stack : undefined;

  logger.error(`Unhandled Error: ${errorMessage}`, { stack: errorStack });

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env['NODE_ENV'] === 'production' ? 'Ha ocurrido un error interno en el servidor' : errorMessage,
    ...(process.env['NODE_ENV'] !== 'production' && errorStack ? { stack: errorStack } : {}),
  });
}
