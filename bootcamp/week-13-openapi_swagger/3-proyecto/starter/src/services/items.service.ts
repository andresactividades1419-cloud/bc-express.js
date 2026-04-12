import { AppError } from '../errors/AppError';
import { itemsRepository } from '../repositories/items.repository';
import { CreateItemDto, UpdateItemDto } from '../validators/item.schema';

export const itemsService = {
  async getAll(page: number, limit: number) {
    const [data, total] = await Promise.all([
      itemsRepository.findAll(page, limit),
      itemsRepository.count(),
    ]);
    return { data, total, page, limit };
  },

  async getById(id: string) {
    const item = await itemsRepository.findById(id);
    if (!item) throw new AppError(404, 'Item not found');
    return item;
  },

  async create(dto: CreateItemDto) {
    return itemsRepository.create(dto);
  },

  async update(id: string, dto: UpdateItemDto) {
    const item = await itemsRepository.findById(id);
    if (!item) throw new AppError(404, 'Item not found');
    return itemsRepository.update(id, dto);
  },

  async remove(id: string) {
    const item = await itemsRepository.findById(id);
    if (!item) throw new AppError(404, 'Item not found');
    await itemsRepository.remove(id);
  },
};
