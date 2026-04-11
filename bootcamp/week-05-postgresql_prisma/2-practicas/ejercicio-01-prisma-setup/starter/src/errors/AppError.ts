// src/errors/AppError.ts — Error operacional de la aplicación
// Distingue errores esperados (AppError) de errores inesperados del sistema

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    // Mantiene el stack trace correcto en V8
    Error.captureStackTrace(this, this.constructor);
  }
}
