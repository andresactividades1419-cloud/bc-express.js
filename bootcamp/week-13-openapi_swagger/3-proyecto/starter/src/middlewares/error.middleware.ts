import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { env } from '../config/env';
import { ZodError } from 'zod';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation failed', issues: err.flatten().fieldErrors });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (env.NODE_ENV === 'development') {
    console.error(err);
    res.status(500).json({ error: err.message, stack: err.stack });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
}
