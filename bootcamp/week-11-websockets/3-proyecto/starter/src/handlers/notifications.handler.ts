import type { TypedServer, TypedSocket } from '../types';

// Este handler registra eventos WebSocket adicionales (opcionales).
// El flujo principal de notificaciones ya está en notifications.service.ts.
export function registerNotificationHandlers(io: TypedServer, socket: TypedSocket): void {
  const { userId, email } = socket.data.user;

  // Evento ping básico (útil para debugging de conexión)
  socket.on('ping', () => {
    socket.emit('notification:new', {
      id: 'ping-response',
      type: 'system',
      title: 'Pong!',
      body: `Hola ${email}, tu conexión WebSocket está activa.`,
      createdAt: new Date().toISOString(),
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`👋 ${email} (${userId}) desconectado: ${reason}`);
  });
}
