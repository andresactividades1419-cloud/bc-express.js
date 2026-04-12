// src/controllers/users.controller.ts
// ============================================
// PASO 4: Implementar el controller updateAvatar
// ============================================

// El controller recibe el archivo que Multer ya procesó (req.file)
// y delega al servicio para subirlo a Cloudinary y actualizar la BD.

import { Request, Response, NextFunction } from 'express';
// import * as usersService from '../services/users.service';
// import { AppError } from '../errors/AppError';

// Descomenta el controller updateAvatar:
// export async function updateAvatar(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     // Verificar que Multer procesó el archivo
//     if (!req.file) {
//       return next(new AppError(400, 'Se requiere una imagen'));
//     }
//
//     // req.user fue añadido por el middleware authenticate
//     const userId = (req as any).user.sub;
//
//     // El service maneja: eliminar avatar anterior + subir nuevo + actualizar BD
//     const avatarUrl = await usersService.updateAvatar(userId, req.file);
//
//     res.json({ avatarUrl });
//   } catch (err) {
//     next(err);
//   }
// }

// También necesitamos el controller para login/register de auth:
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../utils/jwt';
import * as usersRepository from '../repositories/users.repository';
import { AppError } from '../errors/AppError';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const existing = await usersRepository.findByEmail(email);
    if (existing) return next(new AppError(409, 'El email ya está registrado'));

    const hashed = await bcrypt.hash(password, 10);
    const user = await usersRepository.create({ name, email, password: hashed });

    const accessToken = generateAccessToken({
      sub: (user._id as string).toString(),
      email: user.email,
      role: user.role,
    });

    res.status(201).json({ accessToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}

// Placeholder para updateAvatar (reemplazado por el código descomentado en PASO 4)
export async function updateAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
  next(new AppError(501, 'updateAvatar no implementado — descomenta el código del PASO 4'));
}
