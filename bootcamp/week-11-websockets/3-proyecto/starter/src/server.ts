import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { env } from './config/env';
import { app } from './app';
import { authWsMiddleware } from './middlewares/auth.ws';
import { registerNotificationHandlers } from './handlers/notifications.handler';
import { setIo } from './services/notifications.service';
import type { TypedServer } from './types';

// ============================================================
// TODO: Configurar y exportar el servidor Socket.io.
//
// Pasos a implementar:
//   1. Crear httpServer con http.createServer(app)
//   2. Crear io con new Server(httpServer, { cors })
//   3. Exportar io para uso en notifications.service.ts
//   4. Registrar authWsMiddleware(io) ANTES de io.on('connection')
//   5. En io.on('connection'):
//      a. Unir el socket a su personal room: 'user:' + userId
//      b. Llamar registerNotificationHandlers(io, socket)
//   6. Conectar a MongoDB con mongoose.connect()
//   7. Iniciar httpServer.listen() al conectar a MongoDB
// ============================================================

const httpServer = http.createServer(app);

// TODO: Crear y configurar io
// export const io: TypedServer = new Server(httpServer, {
//   cors: {
//     origin: env.FRONTEND_URL,
//     credentials: true,
//   },
// });

// TODO: Inyectar io en el servicio de notificaciones
// setIo(io);

// TODO: Registrar middleware de autenticación
// authWsMiddleware(io);

// TODO: Manejar conexiones autenticadas
// io.on('connection', (socket) => {
//   const { userId, email } = socket.data.user;
//   socket.join(`user:${userId}`);
//   console.log(`✅ ${email} conectado — room personal: user:${userId}`);
//   registerNotificationHandlers(io, socket);
// });

// Iniciar servidor al conectar a MongoDB
mongoose
  .connect(env.MONGODB_URI)
  .then(() => {
    console.log('🗄️  MongoDB conectado');
    httpServer.listen(env.PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
      console.log(`   WebSocket disponible en ws://localhost:${env.PORT}`);
      console.log(`   REST API en http://localhost:${env.PORT}/api/v1`);
    });
  })
  .catch((err: unknown) => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', async () => {
  await mongoose.disconnect();
  httpServer.close();
  process.exit(0);
});
