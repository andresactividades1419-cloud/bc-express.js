import { Types } from 'mongoose';
import * as notificationsRepository from '../repositories/notifications.repository';
import type { TypedServer } from '../types';

// io se inyecta desde server.ts al inicializar
let io: TypedServer | null = null;

export function setIo(ioInstance: TypedServer): void {
  io = ioInstance;
}

// ============================================================
// TODO: Implementar sendToUser
//
// Esta función debe:
//   1. Crear la notificación en la base de datos.
//   2. Si hay una instancia de io disponible, emitir el evento
//      'notification:new' al room personal del usuario: 'user:${userId}'
// ============================================================

export async function sendToUser(
  userId: string,
  notification: {
    type: string;
    title: string;
    body: string;
    resourceId?: string;
  },
): Promise<void> {
  // TODO: Paso 1 — Guardar la notificación en MongoDB
  // const saved = await notificationsRepository.create({
  //   userId: new Types.ObjectId(userId),
  //   type: notification.type,
  //   title: notification.title,
  //   body: notification.body,
  //   ...(notification.resourceId && { resourceId: new Types.ObjectId(notification.resourceId) }),
  // });

  // TODO: Paso 2 — Emitir en tiempo real si el usuario está conectado
  // if (io) {
  //   io.to(`user:${userId}`).emit('notification:new', {
  //     id: saved._id.toString(),
  //     type: saved.type,
  //     title: saved.title,
  //     body: saved.body,
  //     ...(saved.resourceId && { resourceId: saved.resourceId.toString() }),
  //     createdAt: saved.createdAt.toISOString(),
  //   });
  // }

  throw new Error('sendToUser no implementado');
}

export async function getByUser(userId: string) {
  // TODO: Delegar al repositorio
  return notificationsRepository.findByUser(userId);
}

export async function markAsRead(id: string, userId: string) {
  // TODO: Delegar al repositorio
  return notificationsRepository.markAsRead(id, userId);
}

export async function getUnreadCount(userId: string): Promise<number> {
  // TODO: Delegar al repositorio
  return notificationsRepository.countUnread(userId);
}
