// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';
import { ValidationErrorResponse, ErrorResponse } from '../types';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isProduction = process.env['NODE_ENV'] === 'production';

  // 1. ZodError → 400 Bad Request
  if (err instanceof ZodError) {
    const issues = err.issues.map((issue) => ({
      field: issue.path.join('.') || 'body',
      message: issue.message,
    }));

    const response: ValidationErrorResponse = {
      error: 'Validation Error',
      message: 'Datos de entrada inválidos',
      issues,
    };

    logger.warn(`Validation Error: ${JSON.stringify(issues)}`);
    res.status(400).json(response);
    return;
  }

  // 2. AppError → err.statusCode
  if (err instanceof AppError) {
    logger.warn(`AppError (${err.statusCode}): ${err.message}`);
    const response: ErrorResponse = {
      error: err.statusCode === 404 ? 'Not Found' : 'Application Error',
      message: err.message,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // 3. Error genérico no controlado → 500 Internal Server Error
  const errorInstance = err instanceof Error ? err : new Error(String(err));
  logger.error(`Unhandled Error: ${errorInstance.message} - ${errorInstance.stack}`);

  const response: ErrorResponse = {
    error: 'Internal Server Error',
    message: isProduction ? 'Ha ocurrido un error interno en el servidor' : errorInstance.message,
    ...(isProduction ? {} : { stack: errorInstance.stack }),
  };

  res.status(500).json(response);
}
