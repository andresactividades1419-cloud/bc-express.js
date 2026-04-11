// ============================================
// MIDDLEWARES — errorHandler (manejador global)
// ============================================
import { Request, Response, NextFunction } from 'express';

// ============================================
// PASO 3 — Middleware errorHandler
// ⚠️ DEBE tener exactamente 4 parámetros.
//    Express lo detecta como error handler por la aridad.
// Descomenta el siguiente bloque completo:
// ============================================
// import { ZodError } from 'zod';
// import { AppError } from '../errors/AppError';
//
// export function errorHandler(
//   err: unknown,
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ): void {
//   // 1. ZodError → 400 con lista de issues
//   if (err instanceof ZodError) {
//     res.status(400).json({
//       error: 'Validation Error',
//       message: 'Datos de entrada inválidos',
//       issues: err.issues.map((issue) => ({
//         field: issue.path.join('.'),
//         message: issue.message,
//       })),
//     });
//     return;
//   }
//
//   // 2. AppError → código HTTP del error operacional
//   if (err instanceof AppError) {
//     res.status(err.statusCode).json({
//       error: err.statusCode >= 500 ? 'Internal Server Error' : 'Application Error',
//       message: err.message,
//     });
//     return;
//   }
//
//   // 3. Error genérico → 500 (ocultar detalles en producción)
//   const isProduction = process.env['NODE_ENV'] === 'production';
//   const message = isProduction ? 'Error interno del servidor' : (err as Error).message;
//   res.status(500).json({
//     error: 'Internal Server Error',
//     message,
//     ...(isProduction ? {} : { stack: (err as Error).stack }),
//   });
// }

// Placeholder mientras completas el ejercicio (elimina esto al descomentar arriba)
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', message: 'Implementa el errorHandler' });
}
