// src/middlewares/upload.middleware.ts
import multer from 'multer';
import { AppError } from '../errors/AppError';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

const imageFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(400, 'Solo se permiten imágenes JPEG, PNG y WebP'));
  }
};

// Avatar del usuario: máx 5 MB
export const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: imageFilter,
});

// Imagen del recurso principal del dominio: máx 10 MB
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: imageFilter,
});
