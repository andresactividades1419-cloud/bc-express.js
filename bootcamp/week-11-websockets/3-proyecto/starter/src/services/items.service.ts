import { Types } from 'mongoose';
import * as itemsRepository from '../repositories/items.repository';
import * as notificationsService from './notifications.service';
import { AppError } from '../errors/AppError';
import type { CreateItemDto } from '../validators/item.schema';

// ============================================================
// TODO: Implementar los métodos del servicio de ítems.
//
// El método 'create' debe, después de guardar el ítem en la BD,
// llamar a notificationsService.sendToUser() para enviar una
// notificación en tiempo real al usuario creador.
//
// Adapta los mensajes de notificación a tu dominio.
// ============================================================

export async function getAll(userId?: string) {
  // TODO: Delegar al repositorio
  return itemsRepository.findAll(userId);
}

export async function getById(id: string) {
  // TODO: Buscar por id y lanzar AppError(404) si no existe
  // const item = await itemsRepository.findById(id);
  // if (!item) throw new AppError(404, 'Ítem no encontrado');
  // return item;
  throw new Error('getById no implementado');
}

export async function create(dto: CreateItemDto, userId: string) {
  // TODO: Paso 1 — Crear el ítem en la base de datos
  // const item = await itemsRepository.create({
  //   ...dto,
  //   createdBy: new Types.ObjectId(userId),
  // });

  // TODO: Paso 2 — Enviar notificación al creador (adaptar mensaje a tu dominio)
  // await notificationsService.sendToUser(userId, {
  //   type: 'item_created',
  //   title: 'Recurso creado',                    // ← adaptar a tu dominio
  //   body: `"${item.name}" fue creado exitosamente`,
  //   resourceId: item._id.toString(),
  // });

  // return item;
  throw new Error('create no implementado');
}

export async function remove(id: string, userId: string) {
  // TODO: Verificar que el ítem existe y pertenece al usuario antes de eliminar
  const item = await itemsRepository.findById(id);
  if (!item) throw new AppError(404, 'Ítem no encontrado');
  if (item.createdBy.toString() !== userId) {
    throw new AppError(403, 'No tienes permiso para eliminar este ítem');
  }
  return itemsRepository.remove(id);
}
