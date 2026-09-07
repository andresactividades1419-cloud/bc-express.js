import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';

export function authenticate(req: Request, _res: Response, next: NextFunction): void {
  try {
    let token: string | undefined = req.cookies?.accessToken;

    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    if (!token) {
      throw new AppError(401, 'No autenticado: token de acceso requerido');
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(401, 'Token invalido o expirado'));
    }
  }
}

export function authorize(...allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError(401, 'No autenticado: sesion requerida'));
    }

    if (!req.user.role || !allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, 'Acceso denegado: permisos insuficientes para esta operacion'));
    }

    next();
  };
}
