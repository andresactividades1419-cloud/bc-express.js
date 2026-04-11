// ============================================
// SERVICE — lógica de negocio (listo)
// ============================================
import { Product, PaginatedResponse } from '../types';
import * as repo from '../repositories/products.repository';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Product>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Product | undefined> {
  return repo.findById(id);
}

export async function create(dto: repo.CreateProductRepoDto): Promise<Product> {
  return repo.create(dto);
}

export async function update(
  id: number,
  dto: repo.UpdateProductRepoDto
): Promise<Product | undefined> {
  const exists = await repo.findById(id);
  if (!exists) return undefined;
  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) return false;
  return repo.remove(id);
}
