// ============================================
// MIDDLEWARES — notFound (rutas no encontradas)
// ============================================
import { Request, Response, NextFunction } from 'express';

// ============================================
// PASO 2 — Middleware notFound
// Se activa cuando ninguna ruta coincide.
// Descomenta el siguiente bloque completo:
// ============================================
// import { AppError } from '../errors/AppError';
//
// export function notFound(req: Request, _res: Response, next: NextFunction): void {
//   // Pasamos un AppError al siguiente middleware de errores
//   next(new AppError(404, `Ruta ${req.method} ${req.path} no encontrada`));
// }

// Placeholder mientras completas el ejercicio (elimina esto al descomentar arriba)
export function notFound(_req: Request, _res: Response, next: NextFunction): void {
  next();
}
