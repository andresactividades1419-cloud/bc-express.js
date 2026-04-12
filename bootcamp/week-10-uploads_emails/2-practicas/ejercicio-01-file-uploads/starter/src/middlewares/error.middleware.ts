// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppError } from '../errors/AppError';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Errores de Multer (tamaño excedido, demasiados archivos, etc.)
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'Archivo demasiado grande. Máximo 5 MB.' });
      return;
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      res.status(400).json({ error: 'Demasiados archivos.' });
      return;
    }
    res.status(400).json({ error: `Error de upload: ${err.message}` });
    return;
  }

  // Errores de fileFilter (MIME type no permitido)
  if (err.message.includes('Solo se permiten') || err.message.includes('MIME')) {
    res.status(400).json({ error: err.message });
    return;
  }

  // Errores de la aplicación (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Error inesperado (500)
  console.error('Error inesperado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
