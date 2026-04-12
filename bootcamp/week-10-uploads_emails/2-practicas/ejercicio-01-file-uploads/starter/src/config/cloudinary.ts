// src/config/cloudinary.ts
// ============================================
// PASO 1: Configurar el SDK de Cloudinary
// ============================================

// El SDK de Cloudinary necesita tus credenciales para realizar
// operaciones de upload y delete en tu cuenta cloud.

import { v2 as cloudinary } from 'cloudinary';
// import { env } from './env';

// Descomenta la configuración:
// cloudinary.config({
//   cloud_name: env.CLOUDINARY_CLOUD_NAME,
//   api_key: env.CLOUDINARY_API_KEY,
//   api_secret: env.CLOUDINARY_API_SECRET,
// });

export { cloudinary };
