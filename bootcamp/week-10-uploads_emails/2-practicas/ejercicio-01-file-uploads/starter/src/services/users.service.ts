// src/services/users.service.ts
import * as usersRepository from '../repositories/users.repository';
import { uploadToCloudinary, deleteFromCloudinary } from './upload.service';
import { AppError } from '../errors/AppError';

export async function updateAvatar(
  userId: string,
  file: Express.Multer.File
): Promise<string> {
  const user = await usersRepository.findById(userId);
  if (!user) throw new AppError(404, 'Usuario no encontrado');

  // Eliminar el avatar anterior si existe en Cloudinary
  if (user.avatarPublicId) {
    await deleteFromCloudinary(user.avatarPublicId);
  }

  // Subir el nuevo avatar (public_id incluye userId para organizar carpeta)
  const { url, publicId } = await uploadToCloudinary(
    file.buffer,
    'avatars',
    `avatar-${userId}`
  );

  // Persistir en base de datos
  await usersRepository.updateAvatar(userId, url, publicId);

  return url;
}
