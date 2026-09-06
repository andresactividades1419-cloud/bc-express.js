import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // 1. Errores de validación de Zod
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    logger.warn(`Validación Zod fallida en ${req.method} ${req.originalUrl}: ${JSON.stringify(issues)}`);

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

    const errorName =
      err.statusCode === 404
        ? 'Not Found'
        : err.statusCode === 409
        ? 'Conflict'
        : err.statusCode === 400
        ? 'Bad Request'
        : 'Error';

    res.status(err.statusCode).json({
      error: errorName,
      message: err.message,
    });
    return;
  }

  // 3. Error de clave duplicada en MongoDB (11000)
  if (err instanceof MongoServerError && err.code === 11000) {
    logger.warn(`Error de clave duplicada en MongoDB (11000): ${err.message}`);
    res.status(409).json({
      error: 'Conflict',
      message: 'Ya existe un registro con ese valor único en la base de datos',
    });
    return;
  }

  // 4. Error de casteo de Mongoose (CastError en ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    logger.warn(`Error de casteo en Mongoose: ${err.message}`);
    res.status(400).json({
      error: 'Bad Request',
      message: `El valor proporcionado para el campo '${err.path}' no tiene un formato válido`,
    });
    return;
  }

  // 5. Error de validación interna de Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    logger.warn(`Error de validación en Mongoose: ${err.message}`);
    res.status(400).json({
      error: 'Bad Request',
      message: err.message,
    });
    return;
  }

  // 6. Errores no controlados (500 Internal Server Error)
  const errorMessage = err instanceof Error ? err.message : 'Error interno del servidor';
  const errorStack = err instanceof Error ? err.stack : undefined;

  logger.error(`Unhandled Error: ${errorMessage}`, { stack: errorStack });

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env['NODE_ENV'] === 'production' ? 'Ha ocurrido un error interno en el servidor' : errorMessage,
    ...(process.env['NODE_ENV'] !== 'production' && errorStack ? { stack: errorStack } : {}),
  });
}
