// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await authService.forgotPassword(req.body.email);
    // Respuesta idéntica independientemente de si el email existe o no
    res.json({ message: 'Si el email existe, recibirás un enlace para restablecer tu contraseña.' });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    res.json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (err) {
    next(err);
  }
}
