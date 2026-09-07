import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../config/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    const details = err.issues.map((e) => ({
      path: e.path.join('.'),
      message: e.message
    }));

    res.status(400).json({
      success: false,
      error: 'Error de validacion',
      details
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
    return;
  }

  const anyError = err as Record<string, unknown>;

  if (anyError?.code === 11000) {
    const keyValue = anyError.keyValue as Record<string, unknown> | undefined;
    const field = keyValue ? Object.keys(keyValue)[0] : 'campo';
    res.status(409).json({
      success: false,
      error: `El valor proporcionado para el campo '${field}' ya se encuentra registrado`
    });
    return;
  }

  if (anyError?.name === 'CastError') {
    res.status(400).json({
      success: false,
      error: 'Formato de identificador invalido'
    });
    return;
  }

  if (anyError?.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      error: 'Token invalido o malformado'
    });
    return;
  }

  if (anyError?.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: 'Token expirado'
    });
    return;
  }

  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400) {
    res.status(400).json({
      success: false,
      error: 'Formato JSON invalido en el cuerpo de la peticion'
    });
    return;
  }

  logger.error('Error no controlado capturado en middleware:', err);

  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
}
