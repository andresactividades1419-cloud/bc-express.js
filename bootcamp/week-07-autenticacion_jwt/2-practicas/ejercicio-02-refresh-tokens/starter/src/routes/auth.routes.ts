// ============================================
// PASO 5: Rutas con /refresh y /logout
// ============================================
//
// Descomenta las rutas de POST /refresh y POST /logout:

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

// PASO 5: Descomenta las siguientes rutas:
// router.post('/refresh', authController.refresh);
// router.post('/logout', authMiddleware, authController.logout);

export { router as authRouter };
