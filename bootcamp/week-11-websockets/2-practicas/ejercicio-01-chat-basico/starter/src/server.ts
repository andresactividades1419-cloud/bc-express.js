import http from 'http';
import { env } from './config/env';
import { app } from './app';
import { registerChatHandlers } from './handlers/chat.handler';
import type { TypedServer } from './types';

// ============================================================
// PASO 1: Inicializar Socket.io sobre el servidor HTTP
// ============================================================
// Socket.io necesita el servidor HTTP (no el objeto app) para interceptar
// las conexiones WebSocket usando el mismo puerto que Express.
//
// Descomenta las siguientes líneas:
// import { Server } from 'socket.io';
//
// const httpServer = http.createServer(app);
//
// const io: TypedServer = new Server(httpServer, {
//   cors: {
//     origin: env.FRONTEND_URL,
//     credentials: true,
//   },
// });
//
// io.on('connection', (socket) => {
//   registerChatHandlers(io, socket);
// });
//
// httpServer.listen(env.PORT, () => {
//   console.log(`🚀 Servidor WebSocket en http://localhost:${env.PORT}`);
//   console.log(`   Salas disponibles: general, dev, random`);
// });

// ————————————————————————————————————————————————————————————
// Servidor temporal sin Socket.io (activo hasta completar PASO 1)
// ————————————————————————————————————————————————————————————
// Una vez descomentes el bloque de arriba, elimina estas líneas:
const httpServer = http.createServer(app);
httpServer.listen(env.PORT, () => {
  console.log(`⚠️  PASO 1 pendiente — servidor HTTP sin Socket.io en http://localhost:${env.PORT}`);
});
