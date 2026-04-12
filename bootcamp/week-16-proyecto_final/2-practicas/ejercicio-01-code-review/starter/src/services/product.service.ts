import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================
// PASO 4: Product Service
// ============================================================
// Este es el service correcto que el router debe usar.
// La lógica de negocio vive aquí, no en el router.
// ============================================================

export const productService = {
  async getAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  },

  async create(data: { name: string; price: number; stock?: number }) {
    return prisma.product.create({ data });
  },
};
