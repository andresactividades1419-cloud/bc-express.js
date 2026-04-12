import { itemsRepository } from '../repositories/items.repository';
import { invalidateCachePattern } from '../middlewares/cache.middleware';
import { CreateItemDto, UpdateItemDto } from '../validators/item.schema';
import { PaginatedQueryDto } from '../validators/pagination.schema';
import { AppError } from '../errors/AppError';

// Cache key pattern usado por cacheMiddleware en las rutas GET
const CACHE_PATTERN = 'cache:/api/v1/items*';

export const itemsService = {
  async findMany(params: PaginatedQueryDto) {
    return itemsRepository.findMany(params);
  },

  async findById(id: string) {
    const item = await itemsRepository.findById(id);
    if (!item) throw new AppError(404, 'Recurso no encontrado');
    return item;
  },

  // ============================================================
  // TODO: Implementar invalidación de caché en operaciones de escritura
  // ============================================================
  // Después de crear/actualizar/eliminar, llamar:
  //   await invalidateCachePattern(CACHE_PATTERN);
  // para limpiar todas las entradas cacheadas del recurso.

  async create(dto: CreateItemDto) {
    const item = await itemsRepository.create(dto);
    // TODO: Invalidar caché
    return item;
  },

  async update(id: string, dto: UpdateItemDto) {
    await itemsService.findById(id); // verifica que existe
    const item = await itemsRepository.update(id, dto);
    // TODO: Invalidar caché
    return item;
  },

  async delete(id: string) {
    await itemsService.findById(id); // verifica que existe
    await itemsRepository.delete(id);
    // TODO: Invalidar caché
  },
};
