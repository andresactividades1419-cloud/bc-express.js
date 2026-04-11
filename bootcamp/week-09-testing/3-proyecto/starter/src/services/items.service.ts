import { AppError } from '../errors/AppError.js';
import type { CreateItemDto, UpdateItemDto } from '../types/index.js';
import type { IItem } from '../models/item.model.js';
import * as itemsRepo from '../repositories/items.repository.js';

// ============================================================
// ITEMS SERVICE — lógica de negocio del recurso principal
// ============================================================
// Adaptar al dominio asignado:
//   - Biblioteca: validar ISBN único, disponibilidad
//   - Farmacia: validar stock no negativo, requiere receta
//   - Gimnasio: validar membresía activa, fechas de plan
// ============================================================

export async function getAll(userId?: string): Promise<IItem[]> {
  // TODO: Adaptar filtros al dominio
  // Ejemplo: si el dominio tiene items públicos y privados,
  // filtrar según el rol del usuario
  return itemsRepo.findAllItems(userId);
}

export async function getById(id: string): Promise<IItem> {
  const item = await itemsRepo.findItemById(id);
  if (!item) throw new AppError(404, 'Item not found');
  return item;
}

export async function create(dto: CreateItemDto, createdBy: string): Promise<IItem> {
  // TODO: Adaptar validaciones al dominio
  // Ejemplo biblioteca: verificar ISBN único antes de crear
  // Ejemplo farmacia: validar que stock inicial >= 0
  return itemsRepo.createItem(dto, createdBy);
}

export async function update(
  id: string,
  dto: UpdateItemDto,
  requesterId: string,
  requesterRole: string,
): Promise<IItem> {
  const existing = await itemsRepo.findItemById(id);
  if (!existing) throw new AppError(404, 'Item not found');

  // Solo el creador o un admin puede actualizar
  if (existing.createdBy !== requesterId && requesterRole !== 'admin') {
    throw new AppError(403, 'Insufficient permissions');
  }

  const updated = await itemsRepo.updateItem(id, dto);
  if (!updated) throw new AppError(404, 'Item not found');
  return updated;
}

export async function remove(
  id: string,
  requesterId: string,
  requesterRole: string,
): Promise<void> {
  const existing = await itemsRepo.findItemById(id);
  if (!existing) throw new AppError(404, 'Item not found');

  // Solo el creador o un admin puede eliminar
  if (existing.createdBy !== requesterId && requesterRole !== 'admin') {
    throw new AppError(403, 'Insufficient permissions');
  }

  await itemsRepo.deleteItem(id);
}
