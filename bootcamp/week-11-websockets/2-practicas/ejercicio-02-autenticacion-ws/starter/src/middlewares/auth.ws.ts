import type { TypedServer } from '../types';
import { verifyAccessToken } from '../utils/jwt';

// ============================================================
// PASO 1: Middleware de autenticación para Socket.io
// ============================================================
// io.use() se ejecuta ANTES del evento 'connection'.
// Si llamamos next(new Error(...)), la conexión es rechazada
// y el cliente recibe el evento 'connect_error'.
//
// El token JWT llega en socket.handshake.auth.token
// (el cliente lo envía con: io(url, { auth: { token } }) ).
//
// Descomenta las siguientes líneas:
// export function authWsMiddleware(io: TypedServer): void {
//   io.use((socket, next) => {
//     const token = socket.handshake.auth?.token as string | undefined;
//
//     if (!token) {
//       return next(new Error('auth_error: token requerido'));
//     }
//
//     try {
//       const payload = verifyAccessToken(token);
//       socket.data.user = payload;
//       next();
//     } catch {
//       next(new Error('auth_error: token inválido o expirado'));
//     }
//   });
// }

// ————————————————————————————————————————————————————————————
// Placeholder hasta completar el PASO 1
// ————————————————————————————————————————————————————————————
export function authWsMiddleware(_io: TypedServer): void {
  // Implementación pendiente — elimina esta función y descomenta la de arriba
}
