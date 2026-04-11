import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AppError } from '../errors/AppError.js';

// ============================================
// PASO 1: Implementar requireRole middleware
// ============================================
//
// requireRole es una higher-order function:
// recibe uno o más roles permitidos y devuelve
// un RequestHandler que verifica si req.user.role
// está incluido en esa lista.
//
// Reglas:
//   - SIEMPRE debe ejecutarse DESPUÉS de authMiddleware
//   - Si req.user no existe → 401 (no autenticado)
//   - Si el role no coincide → 403 (no autorizado)
//
// Descomenta el bloque de código de abajo (elimina los // de cada línea):

export function requireRole(...roles: string[]): RequestHandler {
  // return (req: Request, _res: Response, next: NextFunction): void => {
  //   if (!req.user) {
  //     return next(new AppError(401, 'Authentication required'));
  //   }
  //
  //   if (!roles.includes(req.user.role as string)) {
  //     return next(
  //       new AppError(403, `Access denied. Required roles: ${roles.join(', ')}`)
  //     );
  //   }
  //
  //   next();
  // };

  // Stub temporal — eliminar cuando implementes el código de arriba
  return (_req: Request, _res: Response, next: NextFunction): void => {
    next(new AppError(403, 'requireRole no implementado — completa el PASO 1'));
  };
}
