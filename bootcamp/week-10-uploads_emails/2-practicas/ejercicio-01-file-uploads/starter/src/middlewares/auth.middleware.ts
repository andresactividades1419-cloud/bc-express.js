// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError(401, 'Token de acceso requerido'));
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch {
    next(new AppError(401, 'Token inválido o expirado'));
  }
}
