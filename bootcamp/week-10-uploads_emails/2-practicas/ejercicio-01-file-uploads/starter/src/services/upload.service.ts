// src/services/upload.service.ts
// ============================================
// PASO 3: Implementar el servicio de upload
// ============================================

// Este servicio encapsula la lógica de Cloudinary.
// El controller no debe saber nada de Cloudinary directamente —
// solo llama a este service y recibe la URL resultante.

import { cloudinary } from '../config/cloudinary';

export interface UploadResult {
  url: string;
  publicId: string;
}

// ============================================
// uploadToCloudinary
// ============================================
// Recibe un Buffer (del req.file.buffer de Multer) y lo sube a Cloudinary.
// Retorna la URL pública segura y el public_id para poder eliminar después.
//
// Descomenta esta función:
// export async function uploadToCloudinary(
//   buffer: Buffer,
//   folder: string,
//   publicId?: string
// ): Promise<UploadResult> {
//   return new Promise((resolve, reject) => {
//     const options = {
//       folder,
//       public_id: publicId,
//       overwrite: true,
//       format: 'webp',
//       quality: 'auto',
//     };
//
//     // upload_stream hace streaming del buffer a Cloudinary
//     const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
//       if (error) {
//         reject(new Error(`Error al subir a Cloudinary: ${error.message}`));
//         return;
//       }
//       if (!result) {
//         reject(new Error('Cloudinary no retornó resultado'));
//         return;
//       }
//       resolve({
//         url: result.secure_url,
//         publicId: result.public_id,
//       });
//     });
//
//     // Enviar los bytes del buffer al stream
//     stream.end(buffer);
//   });
// }

// ============================================
// deleteFromCloudinary
// ============================================
// Elimina un recurso de Cloudinary usando su public_id.
// Se llama antes de subir el nuevo avatar para no acumular imágenes.
//
// Descomenta esta función:
// export async function deleteFromCloudinary(publicId: string): Promise<void> {
//   const result = await cloudinary.uploader.destroy(publicId);
//   if (result.result !== 'ok' && result.result !== 'not found') {
//     throw new Error(`Error al eliminar de Cloudinary: ${result.result}`);
//   }
// }

// Placeholder hasta descomentarlo:
export async function uploadToCloudinary(
  _buffer: Buffer,
  _folder: string,
  _publicId?: string
): Promise<UploadResult> {
  throw new Error('uploadToCloudinary no implementado aún — descomenta el código del PASO 3');
}

export async function deleteFromCloudinary(_publicId: string): Promise<void> {
  throw new Error('deleteFromCloudinary no implementado aún — descomenta el código del PASO 3');
}
