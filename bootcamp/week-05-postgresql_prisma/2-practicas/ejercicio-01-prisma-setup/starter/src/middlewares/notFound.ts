// src/middlewares/notFound.ts — Middleware para rutas no definidas

import { Request, Response } from 'express';

export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`,
  });
}
