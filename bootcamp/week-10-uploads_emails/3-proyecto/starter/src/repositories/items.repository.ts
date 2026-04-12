// src/repositories/items.repository.ts
import { Item, IItem } from '../models/item.model';

export async function findAll(userId: string): Promise<IItem[]> {
  return Item.find({ createdBy: userId }).sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IItem | null> {
  return Item.findById(id).populate('createdBy', 'name email');
}

export async function create(data: {
  name: string;
  description?: string;
  imageUrl?: string;
  imagePublicId?: string;
  createdBy: string;
}): Promise<IItem> {
  return Item.create(data);
}

export async function update(
  id: string,
  data: Partial<{ name: string; description: string }>,
): Promise<IItem | null> {
  return Item.findByIdAndUpdate(id, data, { new: true });
}

export async function updateImage(
  id: string,
  imageUrl: string,
  imagePublicId: string,
): Promise<IItem | null> {
  return Item.findByIdAndUpdate(
    id,
    { imageUrl, imagePublicId },
    { new: true },
  );
}

export async function remove(id: string): Promise<IItem | null> {
  return Item.findByIdAndDelete(id);
}
