import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getAll, markRead, unreadCount } from '../controllers/notifications.controller';

// ============================================================
// TODO: Registrar los endpoints de notificaciones.
//
// Rutas a implementar:
//   GET   /              → Listar mis notificaciones (requiere auth)
//   PATCH /:id/read      → Marcar como leída (requiere auth)
//   GET   /unread/count  → Contador de no leídas (requiere auth)
//
// NOTA: registrar /unread/count ANTES de /:id para evitar conflicto
// ============================================================

export const notificationsRouter = Router();

// TODO: Descomentar las rutas
// notificationsRouter.get('/unread/count', authMiddleware, unreadCount);
// notificationsRouter.get('/', authMiddleware, getAll);
// notificationsRouter.patch('/:id/read', authMiddleware, markRead);
