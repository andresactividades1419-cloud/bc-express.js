import { prisma } from '../lib/prisma';
import { CreateItemDto, UpdateItemDto } from '../validators/item.schema';
import { PaginatedQueryDto } from '../validators/pagination.schema';

export interface CursorPage<T> {
  data: T[];
  hasNextPage: boolean;
  nextCursor: string | null;
}

export const itemsRepository = {
  // ============================================================
  // TODO: Implementar paginación por cursor con filtros
  // ============================================================
  // Pasos:
  //   1. Aplicar take = limit + 1 (N+1 trick)
  //   2. Si cursor existe, agregar { cursor: { id: cursor }, skip: 1 }
  //   3. Aplicar filtros opcionales (category, search) en 'where'
  //   4. Calcular hasNextPage y nextCursor
  //
  // Referencia: 1-teoria/03-paginacion-eficiente.md
  async findMany(params: PaginatedQueryDto): Promise<CursorPage<any>> {
    const { cursor, limit = 20, category, search } = params;

    // TODO: Implementar cursor pagination
    const items = await prisma.item.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    // TODO: Calcular hasNextPage y nextCursor a partir del N+1 trick
    return { data: items, hasNextPage: false, nextCursor: null };
  },

  async findById(id: string) {
    return prisma.item.findUnique({ where: { id } });
  },

  async create(dto: CreateItemDto) {
    return prisma.item.create({ data: dto });
  },

  async update(id: string, dto: UpdateItemDto) {
    return prisma.item.update({ where: { id }, data: dto });
  },

  async delete(id: string) {
    return prisma.item.delete({ where: { id } });
  },
};
