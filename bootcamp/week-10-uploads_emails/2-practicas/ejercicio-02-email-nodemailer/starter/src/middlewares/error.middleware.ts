// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error('Error inesperado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
