import { Router } from 'express';
import { listUsers, getStats } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = Router();

// ============================================
// PASO 4: Proteger rutas de admin con requireRole
// ============================================
//
// Todas las rutas de admin requieren:
//   1. Estar autenticado (authMiddleware)
//   2. Tener el role 'admin' (requireRole)
//
// El orden importa: authMiddleware DEBE ir ANTES que requireRole
// porque requireRole necesita req.user que es poblado por authMiddleware.
//
// Descomenta las dos líneas de abajo:
// router.use(authMiddleware);
// router.use(requireRole('admin'));

// Temporal: solo authMiddleware aplicado
// Eliminar esta línea cuando descomentes las dos de arriba:
router.use(authMiddleware);

router.get('/users', listUsers);
router.get('/stats', getStats);

export default router;
