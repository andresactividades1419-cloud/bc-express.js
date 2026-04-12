import type { TypedServer } from '../types';
import { verifyAccessToken } from '../utils/jwt';

// ============================================================
// TODO: Implementar el middleware de autenticación WebSocket.
//
// El token JWT llega en socket.handshake.auth.token.
// Si el token es inválido, rechazar con next(new Error('...')).
// Si es válido, adjuntar el payload a socket.data.user.
//
// Este middleware se registra en server.ts con io.use(authWsMiddleware).
// ============================================================

export function authWsMiddleware(io: TypedServer): void {
  io.use((socket, next) => {
    // TODO: Extraer el token de socket.handshake.auth.token
    // TODO: Validar que el token existe (next con Error si no)
    // TODO: Verificar con verifyAccessToken(token)
    // TODO: Adjuntar payload a socket.data.user
    // TODO: Llamar next() si todo es correcto
    next(new Error('auth_error: middleware no implementado'));
  });
}
