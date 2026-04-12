import { Notification, INotification } from '../models/notification.model';
import { Types } from 'mongoose';

// ============================================================
// TODO: Implementar las funciones del repositorio de notificaciones.
// ============================================================

export interface CreateNotificationInput {
  userId: Types.ObjectId;
  type: string;
  title: string;
  body: string;
  resourceId?: Types.ObjectId;
}

export async function create(data: CreateNotificationInput): Promise<INotification> {
  // TODO: Crear y retornar la notificación
  // Pista: Notification.create(data)
  throw new Error('create no implementado');
}

export async function findByUser(userId: string): Promise<INotification[]> {
  // TODO: Retornar notificaciones del usuario ordenadas por fecha descendente
  // Pista: Notification.find({ userId }).sort({ createdAt: -1 }).limit(50)
  throw new Error('findByUser no implementado');
}

export async function markAsRead(
  id: string,
  userId: string,
): Promise<INotification | null> {
  // TODO: Marcar la notificación como leída (solo si pertenece al usuario)
  // Pista: Notification.findOneAndUpdate({ _id: id, userId }, { read: true }, { new: true })
  throw new Error('markAsRead no implementado');
}

export async function countUnread(userId: string): Promise<number> {
  // TODO: Contar notificaciones no leídas del usuario
  // Pista: Notification.countDocuments({ userId, read: false })
  throw new Error('countUnread no implementado');
}
