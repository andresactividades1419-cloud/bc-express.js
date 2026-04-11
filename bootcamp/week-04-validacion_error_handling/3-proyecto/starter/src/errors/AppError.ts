// ============================================
// ERRORS — AppError (clase de errores operacionales)
// ============================================

// TODO: Implementar la clase AppError que:
// 1. Extienda Error
// 2. Tenga propiedad readonly statusCode: number
// 3. Tenga propiedad readonly isOperational: boolean (default true)
// 4. En el constructor: llame super(message), asigne propiedades,
//    llame Object.setPrototypeOf(this, new.target.prototype)
//    y Error.captureStackTrace(this, this.constructor)
//
// Ejemplo de uso esperado:
// throw new AppError(404, 'Recurso no encontrado');
// throw new AppError(409, 'Ya existe un item con ese nombre');

// TODO: Implementar también la función helper:
// export function isAppError(err: unknown): err is AppError {
//   return err instanceof AppError;
// }

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  // TODO: reemplaza este constructor con la implementación completa
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    // TODO: añade Object.setPrototypeOf y Error.captureStackTrace
  }
}
