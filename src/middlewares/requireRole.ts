import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../errors/AppError.js';

// requireRole es una funcion de orden superior que retorna un RequestHandler.
// Verifica req.user.role contra la lista de roles permitidos.
// SIEMPRE debe ejecutarse DESPUES de authMiddleware (requiere req.user).
export function requireRole(...roles: string[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError(401, 'Authentication required'));
    }

    if (!roles.includes(req.user.role as string)) {
      return next(
        new AppError(403, `Access denied. Required roles: ${roles.join(', ')}`)
      );
    }

    next();
  };
}
