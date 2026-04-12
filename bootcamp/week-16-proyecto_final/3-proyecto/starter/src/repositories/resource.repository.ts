import { prisma } from '../lib/prisma';
import type { CreateResourceDto, UpdateResourceDto } from '../validators/resource.schema';

// ============================================================
// TODO 3: Adaptar a tu dominio asignado
// ============================================================
// Renombra el modelo Prisma según tu entidad.
// Ejemplo: prisma.book, prisma.medicine, prisma.member
// ============================================================

export const resourceRepository = {
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    // TODO: Cambiar prisma.resource por prisma.tuEntidad
    const [items, total] = await Promise.all([
      prisma.resource.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.resource.count(),
    ]);
    return { items, total };
  },

  async findById(id: string) {
    // TODO: Cambiar prisma.resource por prisma.tuEntidad
    return prisma.resource.findUnique({ where: { id } });
  },

  async create(data: CreateResourceDto) {
    // TODO: Cambiar prisma.resource por prisma.tuEntidad
    return prisma.resource.create({ data });
  },

  async update(id: string, data: UpdateResourceDto) {
    // TODO: Cambiar prisma.resource por prisma.tuEntidad
    return prisma.resource.update({ where: { id }, data });
  },

  async remove(id: string) {
    // TODO: Cambiar prisma.resource por prisma.tuEntidad
    // Considera usar soft delete: update({ data: { active: false } })
    return prisma.resource.delete({ where: { id } });
  },
};
