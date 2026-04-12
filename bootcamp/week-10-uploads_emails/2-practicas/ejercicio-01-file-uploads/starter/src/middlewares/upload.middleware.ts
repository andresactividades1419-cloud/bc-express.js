// src/middlewares/upload.middleware.ts
// ============================================
// PASO 2: Configurar el middleware de Multer
// ============================================

// Multer procesa el multipart/form-data y pone el archivo en req.file.
// Con memoryStorage, el contenido del archivo está en req.file.buffer
// (en memoria RAM), listo para enviar a Cloudinary.

import multer from 'multer';

// Descomenta el export del middleware de upload:
// export const uploadAvatar = multer({
//   // memoryStorage: el archivo no se escribe en disco,
//   // queda en memoria como Buffer para enviarlo a Cloudinary
//   storage: multer.memoryStorage(),
//
//   // Limite de 5 MB por archivo
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//     files: 1,
//   },
//
//   // fileFilter: valida el MIME type ANTES de guardar el archivo
//   fileFilter: (req, file, cb) => {
//     const allowedMimes = new Set(['image/jpeg', 'image/png', 'image/webp']);
//     if (!allowedMimes.has(file.mimetype)) {
//       cb(new Error('Solo se permiten imágenes JPEG, PNG o WebP'));
//       return;
//     }
//     cb(null, true);
//   },
// });

// Placeholder para que compile sin errores hasta descomentarlo:
export const uploadAvatar = multer({ storage: multer.memoryStorage() });
