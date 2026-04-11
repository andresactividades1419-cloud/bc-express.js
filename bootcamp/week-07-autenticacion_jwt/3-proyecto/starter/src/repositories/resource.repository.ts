import { ResourceModel, IResource } from '../models/resource.model';
import { CreateResourceDto, UpdateResourceDto } from '../schemas/resource.schema';
import { AppError } from '../errors/AppError';

// ============================================
// REPOSITORIO DEL RECURSO PRINCIPAL
// ============================================
// Implementa las operaciones de base de datos.
// Si renombraste resource.model.ts, actualiza las importaciones arriba.
// ============================================

export async function findAll(): Promise<IResource[]> {
  // TODO: Retornar todos los documentos del recurso
  // Considera agregar paginación: .skip(offset).limit(limit)
  throw new AppError(501, 'findAll no implementado');
}

export async function findById(id: string): Promise<IResource | null> {
  // TODO: Buscar por ID usando ResourceModel.findById(id)
  // Devuelve null si no existe (el servicio maneja el 404)
  throw new AppError(501, 'findById no implementado');
}

export async function create(data: CreateResourceDto): Promise<IResource> {
  // TODO: Crear un nuevo documento con ResourceModel.create(data)
  // Si el recurso tiene 'createdBy', agrégalo aquí o en el servicio
  throw new AppError(501, 'create no implementado');
}

export async function updateById(
  id: string,
  data: UpdateResourceDto
): Promise<IResource | null> {
  // TODO: Actualizar parcialmente con findByIdAndUpdate
  // Usar { new: true } para retornar el documento actualizado
  // Usar { runValidators: true } para ejecutar validaciones del schema
  throw new AppError(501, 'updateById no implementado');
}

export async function deleteById(id: string): Promise<boolean> {
  // TODO: Eliminar con findByIdAndDelete(id)
  // Devuelve true si se eliminó, false si no existía
  throw new AppError(501, 'deleteById no implementado');
}
