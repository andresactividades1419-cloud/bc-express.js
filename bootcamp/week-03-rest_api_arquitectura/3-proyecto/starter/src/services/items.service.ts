// ============================================
// SERVICE — Lógica de negocio
// ============================================
// Reglas de esta capa:
// - CERO imports de Express (sin Request, Response, NextFunction)
// - Llama al repository para acceder a datos
// - Contiene la paginación y validaciones de dominio
// - Retorna undefined cuando no encuentra; el controller maneja el 404
//
// TODO: Renombra "Item" por el modelo de tu dominio en todo el archivo

import { CreateItemDto, UpdateItemDto, Item, PaginatedResponse, PaginationParams } from '../types';
import * as repo from '../repositories/items.repository';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Item>> {
  // TODO: Obtener todos del repo, aplicar paginación y retornar PaginatedResponse
  // const { page, limit } = params;
  // const all = await repo.findAll();
  // const start = (page - 1) * limit;
  // const data = all.slice(start, start + limit);
  // return { data, total: all.length, page, limit };
  throw new Error('Not implemented');
}

export async function findById(id: number): Promise<Item | undefined> {
  // TODO: Delegar al repo
  // return repo.findById(id);
  throw new Error('Not implemented');
}

export async function create(dto: CreateItemDto): Promise<Item> {
  // TODO: Validaciones de negocio específicas de tu dominio (si aplica)
  // Luego delegar la creación al repo
  // return repo.create(dto);
  throw new Error('Not implemented');
}

export async function update(id: number, dto: UpdateItemDto): Promise<Item | undefined> {
  // TODO: Verificar existencia con findById, luego actualizar
  // const exists = await repo.findById(id);
  // if (!exists) return undefined;
  // return repo.update(id, dto);
  throw new Error('Not implemented');
}

export async function remove(id: number): Promise<boolean> {
  // TODO: Verificar existencia, luego eliminar
  // const exists = await repo.findById(id);
  // if (!exists) return false;
  // return repo.remove(id);
  throw new Error('Not implemented');
}
