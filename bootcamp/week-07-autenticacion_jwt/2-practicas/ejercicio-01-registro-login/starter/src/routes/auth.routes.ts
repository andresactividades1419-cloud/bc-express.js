// ============================================
// PASO 5: Rutas de Autenticación
// ============================================
//
// La ruta GET /me debe estar protegida por authMiddleware.
// Descomenta la línea indicada:

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// PASO 5: Añadir authMiddleware a la ruta /me
// Descomenta la siguiente línea y elimina la de abajo:
// router.get('/me', authMiddleware, authController.me);
router.get('/me', authController.me);  // ← eliminar cuando descomentes la línea de arriba

export { router as authRouter };
