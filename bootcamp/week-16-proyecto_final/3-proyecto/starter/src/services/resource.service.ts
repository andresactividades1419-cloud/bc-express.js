import { AppError } from '../errors/app-error';
import { resourceRepository } from '../repositories/resource.repository';
import type { CreateResourceDto, UpdateResourceDto } from '../validators/resource.schema';

// ============================================================
// TODO 4: Implementar la lógica de negocio de tu dominio
// ============================================================
// Agrega aquí las reglas específicas del dominio.
// Ejemplos:
//   - Biblioteca: verificar disponibilidad antes de préstamo
//   - Farmacia: verificar stock antes de venta
//   - Gimnasio: verificar que la membresía esté activa
// ============================================================

export const resourceService = {
  async getAll(params: { page: number; limit: number }) {
    // TODO: Agrega filtros específicos de tu dominio (ej: solo activos, por categoría)
    return resourceRepository.findAll(params.page, params.limit);
  },

  async getById(id: string) {
    const resource = await resourceRepository.findById(id);
    if (!resource) throw new AppError(404, 'Resource not found');
    return resource;
  },

  async create(dto: CreateResourceDto) {
    // TODO: Agrega validaciones de negocio antes de crear
    // Ejemplo: verificar que no existe otro con el mismo nombre
    return resourceRepository.create(dto);
  },

  async update(id: string, dto: UpdateResourceDto) {
    // Throws 404 if not found (via Prisma P2025 → errorHandler)
    return resourceRepository.update(id, dto);
  },

  async remove(id: string) {
    await resourceRepository.remove(id);
  },
};
