// ============================================
// SERVICE: Entidad Principal
// TODO: Implementar — delega al repositorio
// ============================================

import * as repo from '../repositories/primary.repository';
import type { CreatePrimaryDto, UpdatePrimaryDto } from '../schemas/primary.schema';

export async function getAll(page: number, limit: number, search?: string) {
  // TODO: return repo.findAll(page, limit, search);
  throw new Error('Not implemented');
}

export async function getById(id: string) {
  // TODO: return repo.findById(id);
  throw new Error('Not implemented');
}

export async function createPrimary(dto: CreatePrimaryDto) {
  // TODO: return repo.create(dto);
  throw new Error('Not implemented');
}

export async function updatePrimary(id: string, dto: UpdatePrimaryDto) {
  // TODO: return repo.update(id, dto);
  throw new Error('Not implemented');
}

export async function deletePrimary(id: string) {
  // TODO: return repo.remove(id);
  throw new Error('Not implemented');
}
