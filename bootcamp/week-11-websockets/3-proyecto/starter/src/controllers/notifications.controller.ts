import { Request, Response, NextFunction } from 'express';
import * as notificationsService from '../services/notifications.service';
import { AppError } from '../errors/AppError';

// ============================================================
// TODO: Implementar los controladores de notificaciones.
// ============================================================

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Listar las notificaciones del usuario autenticado
  // Retornar { data: notifications }
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const notifications = await notificationsService.getByUser(req.user.userId);
    res.json({ data: notifications });
  } catch (error) {
    next(error);
  }
}

export async function markRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Marcar notificación como leída
  // Si no existe o no pertenece al usuario: 404
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const notification = await notificationsService.markAsRead(req.params.id, req.user.userId);
    if (!notification) throw new AppError(404, 'Notificación no encontrada');
    res.json(notification);
  } catch (error) {
    next(error);
  }
}

export async function unreadCount(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Retornar contador de notificaciones no leídas
  // Retornar { count: number }
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const count = await notificationsService.getUnreadCount(req.user.userId);
    res.json({ count });
  } catch (error) {
    next(error);
  }
}
