import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Validates req.body against a Zod schema before the handler runs.
// Passes validation errors to errorHandler via next(err).
export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(result.error);
      return;
    }
    req.body = result.data;
    next();
  };
}
