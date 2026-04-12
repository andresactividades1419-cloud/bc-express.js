import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../errors/AppError';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export function authMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new AppError(401, 'No autorizado');

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; role: string };
    req.user = payload;
    next();
  } catch {
    throw new AppError(401, 'Token inválido o expirado');
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError(403, 'Acceso denegado');
    }
    next();
  };
}
