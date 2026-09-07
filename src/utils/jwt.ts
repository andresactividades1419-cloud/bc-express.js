import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';

export interface JwtPayload {
  sub: string;
  email?: string;
  role?: string;
  name?: string;
}

export function signAccessToken(payload: JwtPayload): string {
  const secret = process.env['JWT_ACCESS_SECRET'];
  if (!secret) {
    throw new AppError(500, 'JWT_ACCESS_SECRET no esta configurado');
  }
  return jwt.sign(payload, secret, { expiresIn: '15m' });
}

export function verifyAccessToken(token: string): JwtPayload {
  const secret = process.env['JWT_ACCESS_SECRET'];
  if (!secret) {
    throw new AppError(500, 'JWT_ACCESS_SECRET no esta configurado');
  }
  return jwt.verify(token, secret) as JwtPayload;
}

export function signRefreshToken(payload: JwtPayload | Pick<JwtPayload, 'sub'>): string {
  const secret = process.env['JWT_REFRESH_SECRET'];
  if (!secret) {
    throw new AppError(500, 'JWT_REFRESH_SECRET no esta configurado');
  }
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyRefreshToken(token: string): JwtPayload {
  const secret = process.env['JWT_REFRESH_SECRET'];
  if (!secret) {
    throw new AppError(500, 'JWT_REFRESH_SECRET no esta configurado');
  }
  return jwt.verify(token, secret) as JwtPayload;
}
