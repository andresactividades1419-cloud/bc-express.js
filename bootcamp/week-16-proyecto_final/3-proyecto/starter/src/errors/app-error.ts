// Custom error class for domain/operational errors.
// Thrown in services when a known condition fails (e.g., resource not found).
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
