import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/item.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = Router();

// ============================================
// TODO: Define las políticas de acceso para tu dominio
// ============================================
//
// Opciones de acceso:
//   - Público (sin middleware)
//   - Autenticado (authMiddleware)
//   - Solo admin (authMiddleware + requireRole('admin'))
//
// Ejemplo de decisión de diseño:
//   ¿Puede un usuario sin cuenta ver el catálogo de tu dominio?
//   → Si sí: GET / y GET /:id son públicos
//   → Si no: también requieren authMiddleware
//
// IMPORTANTE: requireRole SIEMPRE después de authMiddleware

// TODO: Ajusta los middlewares según tu dominio
// GET all — considera si debe ser público o autenticado
router.get('/', getAll);

// GET by ID — considera si debe ser público o autenticado
router.get('/:id', getById);

// POST — crear recurso requiere autenticación
router.post('/', authMiddleware, create);

// PATCH — actualizar: autenticado (service verifica si es dueño o admin)
router.patch('/:id', authMiddleware, update);

// DELETE — eliminar: solo admin
router.delete('/:id', authMiddleware, requireRole('admin'), remove);

export default router;
