import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.schema';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = registerSchema.parse(req.body);
    const result = await authService.register(dto);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = loginSchema.parse(req.body);
    const result = await authService.login(dto);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
