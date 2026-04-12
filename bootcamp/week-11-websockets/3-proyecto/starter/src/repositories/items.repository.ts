import { Item, IItem } from '../models/item.model';
import type { CreateItemDto } from '../validators/item.schema';
import { Types } from 'mongoose';

// ============================================================
// TODO: Implementar las funciones del repositorio de ítems.
//
// Cada función debe interactuar con el modelo Mongoose 'Item'.
// ============================================================

export async function findAll(createdBy?: string): Promise<IItem[]> {
  // TODO: Retornar todos los ítems, opcionalmente filtrados por createdBy
  // Pista: Item.find({ ...(createdBy && { createdBy }) }).sort({ createdAt: -1 })
  throw new Error('findAll no implementado');
}

export async function findById(id: string): Promise<IItem | null> {
  // TODO: Retornar el ítem por id o null si no existe
  // Pista: Item.findById(id)
  throw new Error('findById no implementado');
}

export async function create(
  dto: CreateItemDto & { createdBy: Types.ObjectId },
): Promise<IItem> {
  // TODO: Crear y retornar el nuevo ítem
  // Pista: Item.create(dto)
  throw new Error('create no implementado');
}

export async function remove(id: string): Promise<IItem | null> {
  // TODO: Eliminar y retornar el ítem eliminado
  // Pista: Item.findByIdAndDelete(id)
  throw new Error('remove no implementado');
}
