// src/routes/users.routes.ts
// ============================================
// PASO 5: Registrar la ruta PUT /me/avatar
// ============================================

// La ruta encadena tres middlewares:
// 1. authenticate — verifica el JWT y agrega req.user
// 2. uploadAvatar.single('avatar') — Multer procesa el archivo
// 3. updateAvatar — controller que sube a Cloudinary

import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { uploadAvatar } from '../middlewares/upload.middleware';
import { updateAvatar, register } from '../controllers/users.controller';

const router = Router();

// Ruta de registro (para pruebas)
router.post('/register', register);

// ============================================
// Descomenta la ruta del avatar:
// ============================================
// router.put('/me/avatar', authenticate, uploadAvatar.single('avatar'), updateAvatar);
//
// Explicación de la cadena de middlewares:
// - authenticate: verifica Bearer token, añade req.user con el payload del JWT
// - uploadAvatar.single('avatar'): espera un campo llamado 'avatar' en form-data
//   Si el MIME type no es permitido o el archivo es muy grande → llama a next(err)
//   Si ok → req.file contiene el archivo listo para usar
// - updateAvatar: controller final que:
//   1. Lee req.file.buffer
//   2. Llama a usersService.updateAvatar(userId, req.file)
//   3. Retorna 200 { avatarUrl }

export default router;
