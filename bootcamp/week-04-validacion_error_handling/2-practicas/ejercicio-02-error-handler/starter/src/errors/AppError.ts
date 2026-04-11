// ============================================
// ERRORS — AppError (clase de errores operacionales)
// ============================================

// ============================================
// PASO 1 — Clase AppError
// Descomenta el siguiente bloque completo:
// ============================================
// export class AppError extends Error {
//   public readonly statusCode: number;
//   public readonly isOperational: boolean;
//
//   constructor(statusCode: number, message: string, isOperational = true) {
//     super(message);
//     this.statusCode = statusCode;
//     this.isOperational = isOperational;
//     // Fix necesario en TypeScript + CommonJS al extender clases nativas
//     Object.setPrototypeOf(this, new.target.prototype);
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// Exporta una función auxiliar para que instanceof funcione fuera del módulo
// Descomenta junto con la clase:
// export function isAppError(err: unknown): err is AppError {
//   return err instanceof AppError;
// }
