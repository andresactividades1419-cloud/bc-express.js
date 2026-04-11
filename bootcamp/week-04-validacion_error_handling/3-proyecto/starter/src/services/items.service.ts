// ============================================
// SERVICE — lógica de negocio
// ============================================
import { Item, PaginatedResponse } from '../types';
import * as repo from '../repositories/items.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

// TODO: implementar findAll con paginación offset
// Debe calcular start = (page-1)*limit y retornar PaginatedResponse<Item>
export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Item>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  // TODO: calcular slice correcto para la paginación
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

// TODO: implementar findById
// Si no existe → throw new AppError(404, ...)
export async function findById(id: number): Promise<Item> {
  const item = await repo.findById(id);
  // TODO: lanzar AppError(404, ...) si item es undefined
  if (!item) throw new AppError(404, `Item ${id} not found`);
  return item;
}

// TODO: implementar create
export async function create(dto: repo.CreateItemRepoDto): Promise<Item> {
  // TODO: puedes añadir validación de unicidad aquí con AppError(409, ...)
  return repo.create(dto);
}

// TODO: implementar update
// Si no existe → throw new AppError(404, ...)
export async function update(id: number, dto: repo.UpdateItemRepoDto): Promise<Item> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Item ${id} not found`);
  const updated = await repo.update(id, dto);
  return updated!;
}

// TODO: implementar remove
// Si no existe → throw new AppError(404, ...)
export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Item ${id} not found`);
  await repo.remove(id);
}
