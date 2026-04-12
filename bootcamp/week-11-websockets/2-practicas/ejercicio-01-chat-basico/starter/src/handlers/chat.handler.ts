import type { TypedServer, TypedSocket } from '../types';

// Este handler registra todos los eventos de chat para un socket conectado.
// Es llamado desde server.ts dentro de io.on('connection', ...).
export function registerChatHandlers(io: TypedServer, socket: TypedSocket): void {
  console.log(`🔌 Socket conectado: ${socket.id}`);

  // ============================================================
  // PASO 2: Manejar el evento sendMessage
  // ============================================================
  // Cuando el cliente emite 'sendMessage', retransmitir el mensaje a TODOS
  // los sockets de la sala (incluyendo al emisor) con io.to(room).emit().
  //
  // Descomenta las siguientes líneas:
  // socket.on('sendMessage', ({ text, room }) => {
  //   io.to(room).emit('message', {
  //     id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  //     text,
  //     username: socket.data.username ?? 'Anónimo',
  //     room,
  //     timestamp: new Date().toISOString(),
  //   });
  // });

  // ============================================================
  // PASO 3: Manejar el evento joinRoom
  // ============================================================
  // Al unirse a una sala:
  //   1. Salir de la sala anterior si el socket ya estaba en una.
  //   2. Unirse con socket.join(room).
  //   3. Notificar a los DEMÁS de la sala (socket.to(room).emit).
  //   4. Enviar la lista de usuarios a TODOS en la sala.
  //
  // Descomenta las siguientes líneas:
  // socket.on('joinRoom', async ({ username, room }) => {
  //   // 1. Salir de sala anterior
  //   if (socket.data.currentRoom) {
  //     socket.leave(socket.data.currentRoom);
  //     socket.to(socket.data.currentRoom).emit('userLeft', {
  //       username: socket.data.username ?? '',
  //       room: socket.data.currentRoom,
  //       timestamp: new Date().toISOString(),
  //     });
  //   }
  //
  //   // 2. Unirse a la nueva sala y guardar estado en socket.data
  //   await socket.join(room);
  //   socket.data.username = username;
  //   socket.data.currentRoom = room;
  //
  //   // 3. Notificar al resto de la sala que llegó un nuevo usuario
  //   socket.to(room).emit('userJoined', {
  //     username,
  //     room,
  //     timestamp: new Date().toISOString(),
  //   });
  //
  //   // 4. Construir y enviar la lista actualizada de usuarios
  //   const sockets = await io.in(room).fetchSockets();
  //   const users = sockets.map((s) => s.data.username).filter(Boolean) as string[];
  //   io.to(room).emit('roomUsers', { room, users });
  // });

  // ============================================================
  // PASO 4: Manejar la desconexión
  // ============================================================
  // 'disconnect' se emite automáticamente cuando el cliente cierra
  // el tab o pierde la conexión. Notificamos a su sala actual.
  //
  // Descomenta las siguientes líneas:
  // socket.on('disconnect', (reason) => {
  //   if (socket.data.currentRoom) {
  //     socket.to(socket.data.currentRoom).emit('userLeft', {
  //       username: socket.data.username ?? 'Desconocido',
  //       room: socket.data.currentRoom,
  //       timestamp: new Date().toISOString(),
  //     });
  //   }
  //   console.log(`❌ Socket desconectado: ${socket.id} (${reason})`);
  // });
}
