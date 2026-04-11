// ============================================
// PASO 2: Utilidades de JWT — Access + Refresh
// ============================================
//
// Descomenta todas las funciones:

import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

// ── Access Token ──────────────────────────────────────────────────────────────
// export function signAccessToken(payload: JwtPayload): string {
//   return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
//     expiresIn: '15m',
//   });
// }

// export function verifyAccessToken(token: string): JwtPayload {
//   return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
// }

// ── Refresh Token (PASO 2) ────────────────────────────────────────────────────
// El refresh token usa un SECRETO DIFERENTE al access token
// export function signRefreshToken(payload: Pick<JwtPayload, 'sub'>): string {
//   return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
//     expiresIn: '7d',
//   });
// }

// export function verifyRefreshToken(token: string): Pick<JwtPayload, 'sub'> {
//   return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as Pick<JwtPayload, 'sub'>;
// }

// Stubs temporales — eliminar cuando descomentes las funciones reales
export function signAccessToken(_payload: JwtPayload): string {
  throw new Error('signAccessToken not implemented — descomenta el PASO 2');
}
export function verifyAccessToken(_token: string): JwtPayload {
  throw new Error('verifyAccessToken not implemented — descomenta el PASO 2');
}
export function signRefreshToken(_payload: Pick<JwtPayload, 'sub'>): string {
  throw new Error('signRefreshToken not implemented — descomenta el PASO 2');
}
export function verifyRefreshToken(_token: string): Pick<JwtPayload, 'sub'> {
  throw new Error('verifyRefreshToken not implemented — descomenta el PASO 2');
}
