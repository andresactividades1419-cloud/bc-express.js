import { Item, IItem } from '../models/item.model.js';
import type { CreateItemDto, UpdateItemDto } from '../schemas/item.schema.js';

// ============================================
// TODO: Adapta las funciones a tu dominio
// ============================================
// Renombra Item → tu modelo (Book, Medicine, etc.)

export async function findAll(): Promise<IItem[]> {
  // TODO: Implementar listado
  // Considera agregar paginación: .skip((page-1)*limit).limit(limit)
  // Considera filtros específicos de tu dominio
  return Item.find({ active: true }).sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IItem | null> {
  // TODO: Implementar búsqueda por ID
  return Item.findById(id);
}

export async function create(data: CreateItemDto, userId: string): Promise<IItem> {
  // TODO: Implementar creación
  // createdBy guarda quién creó el recurso (para autorización posterior)
  return Item.create({ ...data, createdBy: userId });
}

export async function update(
  id: string,
  data: UpdateItemDto,
  requesterId: string,
  requesterRole: string
): Promise<IItem | null> {
  // TODO: Implementar actualización con verificación de permisos
  // Un usuario solo puede editar SU recurso; admin puede editar cualquiera
  const item = await Item.findById(id);
  if (!item) return null;

  // TODO: Descomentar la verificación de permisos:
  // if (requesterRole !== 'admin' && item.createdBy !== requesterId) {
  //   throw new Error('FORBIDDEN'); // capturar en controller → AppError(403)
  // }

  return Item.findByIdAndUpdate(id, data, { new: true });
}

export async function remove(id: string): Promise<IItem | null> {
  // TODO: Implementar eliminación (solo admin — enforced en la ruta)
  return Item.findByIdAndDelete(id);
}
