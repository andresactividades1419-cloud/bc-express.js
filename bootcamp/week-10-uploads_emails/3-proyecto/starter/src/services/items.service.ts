// src/services/items.service.ts
import { IItem } from '../models/item.model';
import * as itemsRepository from '../repositories/items.repository';
import { uploadToCloudinary, deleteFromCloudinary } from './upload.service';
import { sendItemCreatedEmail } from './email.service';
import * as usersRepository from '../repositories/users.repository';
import { AppError } from '../errors/AppError';

export async function getAll(userId: string): Promise<IItem[]> {
  return itemsRepository.findAll(userId);
}

export async function getById(id: string): Promise<IItem> {
  const item = await itemsRepository.findById(id);
  if (!item) throw new AppError(404, 'Recurso no encontrado');
  return item;
}

export async function create(
  data: { name: string; description?: string },
  userId: string,
  file?: Express.Multer.File,
): Promise<IItem> {
  let imageUrl: string | undefined;
  let imagePublicId: string | undefined;

  if (file) {
    const result = await uploadToCloudinary(file.buffer, 'bootcamp/items');
    imageUrl = result.url;
    imagePublicId = result.publicId;
  }

  const item = await itemsRepository.create({ ...data, imageUrl, imagePublicId, createdBy: userId });

  // Notificar al usuario por correo (fire-and-forget)
  const user = await usersRepository.findById(userId);
  if (user) {
    sendItemCreatedEmail(user.email, user.name, item.name).catch((err) =>
      console.error('Error enviando correo de creación:', err),
    );
  }

  return item;
}

export async function update(
  id: string,
  userId: string,
  data: Partial<{ name: string; description: string }>,
): Promise<IItem> {
  const item = await itemsRepository.findById(id);
  if (!item) throw new AppError(404, 'Recurso no encontrado');
  if (String(item.createdBy) !== userId) throw new AppError(403, 'No tienes permiso');

  const updated = await itemsRepository.update(id, data);
  if (!updated) throw new AppError(500, 'Error al actualizar');
  return updated;
}

export async function updateImage(
  id: string,
  userId: string,
  file: Express.Multer.File,
): Promise<IItem> {
  const item = await itemsRepository.findById(id);
  if (!item) throw new AppError(404, 'Recurso no encontrado');
  if (String(item.createdBy) !== userId) throw new AppError(403, 'No tienes permiso');

  if (item.imagePublicId) {
    await deleteFromCloudinary(item.imagePublicId);
  }

  const { url, publicId } = await uploadToCloudinary(file.buffer, 'bootcamp/items');
  const updated = await itemsRepository.updateImage(id, url, publicId);
  if (!updated) throw new AppError(500, 'Error al actualizar imagen');
  return updated;
}

export async function remove(id: string, userId: string): Promise<void> {
  const item = await itemsRepository.findById(id);
  if (!item) throw new AppError(404, 'Recurso no encontrado');
  if (String(item.createdBy) !== userId) throw new AppError(403, 'No tienes permiso');

  if (item.imagePublicId) {
    await deleteFromCloudinary(item.imagePublicId);
  }

  await itemsRepository.remove(id);
}
