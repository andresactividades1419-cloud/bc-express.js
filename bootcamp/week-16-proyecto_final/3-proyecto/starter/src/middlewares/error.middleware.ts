import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../errors/app-error';
import { logger } from '../lib/logger';
import { env } from '../config/env';

// Global error handler middleware — must be registered last in app.ts
// Handles AppError, ZodError, Prisma errors, and generic errors uniformly.
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  // Operational error — known and expected
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Validation error from Zod
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.flatten().fieldErrors });
    return;
  }

  // Prisma: record not found
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2025'
  ) {
    res.status(404).json({ error: 'Resource not found' });
    return;
  }

  // Prisma: unique constraint violation
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  ) {
    res.status(409).json({ error: 'Resource already exists' });
    return;
  }

  // Unexpected server error — log full details, hide stack trace from client
  logger.error('Unhandled error', { message: err.message, stack: err.stack });
  res.status(500).json({
    error: 'Internal server error',
    ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
