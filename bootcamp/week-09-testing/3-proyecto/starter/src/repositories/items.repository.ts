import { ItemModel, type IItem } from '../models/item.model.js';
import type { CreateItemDto, UpdateItemDto } from '../types/index.js';

// ============================================================
// REPOSITORIO DE ITEMS — capa de acceso a datos
// ============================================================
// En los unit tests, ESTE módulo se mockea con jest.mock().
// En los integration tests, accede a MongoDB Memory Server.
// ============================================================

export async function findAllItems(createdBy?: string): Promise<IItem[]> {
  const filter = createdBy ? { createdBy } : {};
  return ItemModel.find(filter).lean<IItem[]>().exec();
}

export async function findItemById(id: string): Promise<IItem | null> {
  return ItemModel.findById(id).lean<IItem>().exec();
}

export async function createItem(
  dto: CreateItemDto,
  createdBy: string,
): Promise<IItem> {
  const item = new ItemModel({ ...dto, createdBy });
  return item.save() as unknown as IItem;
}

export async function updateItem(
  id: string,
  dto: UpdateItemDto,
): Promise<IItem | null> {
  return ItemModel.findByIdAndUpdate(id, dto, { new: true }).lean<IItem>().exec();
}

export async function deleteItem(id: string): Promise<IItem | null> {
  return ItemModel.findByIdAndDelete(id).lean<IItem>().exec();
}
