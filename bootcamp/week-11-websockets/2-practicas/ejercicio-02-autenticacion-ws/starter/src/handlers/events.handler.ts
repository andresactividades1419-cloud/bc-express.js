import type { TypedServer, TypedSocket } from '../types';

// Este handler registra eventos que REQUIEREN autenticación.
// Solo llegan a este punto sockets que pasaron el middleware io.use().
export function registerEventHandlers(io: TypedServer, socket: TypedSocket): void {
  // ============================================================
  // PASO 2: Usar socket.data.user en los handlers
  // ============================================================
  // socket.data.user fue adjuntado por el middleware io.use() con los
  // datos del JWT verificado: { userId, email, role }.
  //
  // Descomenta las siguientes líneas:
  // socket.on('ping', () => {
  //   socket.emit('pong', {
  //     message: `Hola ${socket.data.user.email}, tu userId es ${socket.data.user.userId}`,
  //     timestamp: new Date().toISOString(),
  //   });
  // });
  //
  // socket.on('subscribe', (topic) => {
  //   socket.join(topic);
  //   console.log(`📡 ${socket.data.user.email} se suscribió a: ${topic}`);
  //   // Demostrar que está en el room: emitir notificación de prueba
  //   io.to(topic).emit('notification', {
  //     type: 'info',
  //     title: `Nuevo suscriptor en ${topic}`,
  //     body: `${socket.data.user.email} se unió al topic ${topic}`,
  //     createdAt: new Date().toISOString(),
  //   });
  // });

  console.log(`✅ Handlers registrados para usuario (PASO 2 pendiente)`);
}
