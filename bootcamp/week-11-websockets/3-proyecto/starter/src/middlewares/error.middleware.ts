import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: err.flatten().fieldErrors,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (err instanceof Error) {
    const statusCode = process.env.NODE_ENV === 'production' ? 500 : 500;
    res.status(statusCode).json({
      error: process.env.NODE_ENV === 'production' ? 'Error interno del servidor' : err.message,
    });
    return;
  }

  res.status(500).json({ error: 'Error interno del servidor' });
}
