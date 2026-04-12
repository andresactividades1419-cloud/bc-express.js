import http from 'http';
import { Server } from 'socket.io';
import { env } from './config/env';
import { app } from './app';
import { authWsMiddleware } from './middlewares/auth.ws';
import { registerEventHandlers } from './handlers/events.handler';
import type { TypedServer } from './types';

const httpServer = http.createServer(app);

const io: TypedServer = new Server(httpServer, {
  cors: {
    origin: env.FRONTEND_URL,
    credentials: true,
  },
});

// ============================================================
// PASO 4: Registrar el middleware de autenticación
// ============================================================
// io.use() debe ejecutarse ANTES de io.on('connection').
// Una vez descomentes authWsMiddleware en auth.ws.ts (PASO 1),
// descomenta la siguiente línea para activarlo:
// authWsMiddleware(io);

// ============================================================
// PASO 3: Unirse al personal room tras autenticación
// ============================================================
// El personal room 'user:${userId}' permite emitir a un usuario
// específico desde cualquier parte del servidor (ej: servicios REST).
//
// Descomenta dentro del bloque io.on('connection'):
io.on('connection', (socket) => {
  // Descomenta las siguientes líneas (PASO 3):
  // const { userId, email } = socket.data.user;
  // socket.join(`user:${userId}`);
  // console.log(`✅ ${email} conectado — room personal: user:${userId}`);

  // Registrar handlers de eventos (PASO 2)
  registerEventHandlers(io, socket);

  socket.on('disconnect', (reason) => {
    console.log(`❌ Socket desconectado: ${socket.id} (${reason})`);
  });
});

httpServer.listen(env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  console.log(`   WebSocket disponible ws://localhost:${env.PORT}`);
  console.log(`   Auth REST: POST /api/v1/auth/register y /api/v1/auth/login`);
});
