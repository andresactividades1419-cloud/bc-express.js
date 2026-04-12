import { prisma } from '../lib/prisma';
import { CreateItemDto, UpdateItemDto } from '../validators/item.schema';

export const itemsRepository = {
  findAll(page: number, limit: number) {
    return prisma.item.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  count() {
    return prisma.item.count();
  },

  findById(id: string) {
    return prisma.item.findUnique({ where: { id } });
  },

  create(data: CreateItemDto) {
    return prisma.item.create({ data });
  },

  update(id: string, data: UpdateItemDto) {
    return prisma.item.update({ where: { id }, data });
  },

  remove(id: string) {
    return prisma.item.delete({ where: { id } });
  },
};
