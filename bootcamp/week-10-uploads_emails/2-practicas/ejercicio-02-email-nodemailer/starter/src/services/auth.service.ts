// src/services/auth.service.ts
// ============================================
// PASO 4: Integrar emails en register y forgotPassword
// ============================================

// En register: email de bienvenida en fire-and-forget (sin await)
//   → no bloqueamos la respuesta por un email
// En forgotPassword: email de reset con await
//   → queremos que el email se envíe antes de responder

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import * as usersRepository from '../repositories/users.repository';
import { generateAccessToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';
// import { sendWelcomeEmail, sendResetPasswordEmail } from './email.service';

export async function register(dto: {
  name: string;
  email: string;
  password: string;
}): Promise<{ accessToken: string; user: object }> {
  const existing = await usersRepository.findByEmail(dto.email);
  if (existing) throw new AppError(409, 'El email ya está registrado');

  const hashed = await bcrypt.hash(dto.password, 10);
  const user = await usersRepository.create({ ...dto, password: hashed });

  // ============================================
  // Descomenta el envío del email de bienvenida:
  // ============================================
  // Fire-and-forget: no esperamos el resultado del email
  // para no retrasar la respuesta 201 al cliente.
  // sendWelcomeEmail(user.email, user.name).catch((err) => {
  //   console.error('Error enviando email de bienvenida:', err);
  // });

  const accessToken = generateAccessToken({
    sub: (user._id as string).toString(),
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
    user: { id: user._id, name: user.name, email: user.email },
  };
}

export async function forgotPassword(email: string): Promise<void> {
  const user = await usersRepository.findByEmail(email);

  // No revelar si el email existe (previene user enumeration attack)
  if (!user) return;

  // Generar token seguro con crypto.randomBytes
  const resetToken = crypto.randomBytes(32).toString('hex');
  // Guardar el HASH del token en BD (nunca el token en texto plano)
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await usersRepository.saveResetToken(user.id, hashedToken, expiresAt);

  // ============================================
  // Descomenta el envío del email de reset:
  // ============================================
  // await: necesitamos saber si falló para manejar el error correctamente
  // await sendResetPasswordEmail(user.email, user.name, resetToken);
  console.log('Reset token generado (no se envía email hasta descomentarlo):', resetToken);
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  // Hashear el token recibido para compararlo con el de la BD
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await usersRepository.findByResetToken(hashedToken);
  if (!user) throw new AppError(400, 'Token inválido o expirado');

  const hashed = await bcrypt.hash(newPassword, 10);
  await usersRepository.clearResetToken(user.id, hashed);
}
