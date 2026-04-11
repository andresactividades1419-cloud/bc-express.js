// ============================================
// PASO 3: Utilidades de JWT
// ============================================
//
// Centraliza la firma y verificación de tokens.
// Descomenta la función signAccessToken y verifyAccessToken:

import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: string;    // user ID
  email: string;
  role: string;
}

// signAccessToken — firma un access token con expiración de 15 minutos
// export function signAccessToken(payload: JwtPayload): string {
//   return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
//     expiresIn: '15m',
//   });
// }

// verifyAccessToken — verifica y decodifica el token
// Lanza JsonWebTokenError o TokenExpiredError si el token no es válido
// export function verifyAccessToken(token: string): JwtPayload {
//   return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
// }

// Stubs temporales (eliminar cuando descomentes las funciones reales)
export function signAccessToken(_payload: JwtPayload): string {
  throw new Error('signAccessToken not implemented — descomenta el código del PASO 3');
}

export function verifyAccessToken(_token: string): JwtPayload {
  throw new Error('verifyAccessToken not implemented — descomenta el código del PASO 3');
}
