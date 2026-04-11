// ============================================
// PASO 4: Middleware de Autenticación
// ============================================
//
// Lee el access token de la cookie HttpOnly y lo verifica.
// Si el token es válido, agrega el payload a req.user.
//
// Descomenta el cuerpo del middleware:

import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // PASO 4: Descomenta el siguiente bloque y elimina el next() del final:
  // const token = req.cookies?.accessToken as string | undefined;
  //
  // if (!token) {
  //   next(new AppError(401, 'No autenticado'));
  //   return;
  // }
  //
  // try {
  //   const decoded = verifyAccessToken(token);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   if (err instanceof TokenExpiredError) {
  //     next(new AppError(401, 'Token expirado'));
  //     return;
  //   }
  //   next(new AppError(401, 'Token inválido'));
  // }

  // Stub temporal — eliminar cuando descomentes arriba
  next(new AppError(401, 'authMiddleware not implemented — descomenta el PASO 4'));
}
