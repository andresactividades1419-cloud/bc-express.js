// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppError } from '../errors/AppError';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Multer errors
  if (err instanceof multer.MulterError) {
    const messages: Record<string, string> = {
      LIMIT_FILE_SIZE: 'El archivo supera el tamaño máximo permitido',
      LIMIT_FILE_COUNT: 'Se excedió el número máximo de archivos',
      LIMIT_UNEXPECTED_FILE: 'Campo de archivo inesperado',
    };
    res.status(400).json({
      status: 'error',
      message: messages[err.code] ?? `Error de carga: ${err.message}`,
    });
    return;
  }

  // AppError conocido
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ status: 'error', message: err.message });
    return;
  }

  // Error genérico
  console.error('Unhandled error:', err);
  res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
}
