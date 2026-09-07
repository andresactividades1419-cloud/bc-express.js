export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCodeOrMessage: number | string, messageOrStatusCode?: string | number) {
    let code = 500;
    let msg = 'Error interno';

    if (typeof statusCodeOrMessage === 'number') {
      code = statusCodeOrMessage;
      msg = typeof messageOrStatusCode === 'string' ? messageOrStatusCode : 'Error en la aplicacion';
    } else {
      msg = statusCodeOrMessage;
      code = typeof messageOrStatusCode === 'number' ? messageOrStatusCode : 500;
    }

    super(msg);
    this.statusCode = code;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
