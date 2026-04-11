// ============================================
// SERVICE: Entidad Secundaria
// TODO: Implementar — delega al repositorio
// ============================================

import * as repo from '../repositories/secondary.repository';
import type { CreateSecondaryDto, UpdateSecondaryDto } from '../schemas/secondary.schema';

export async function getAll() {
  // TODO: return repo.findAll();
  throw new Error('Not implemented');
}

export async function getById(id: string) {
  // TODO: return repo.findById(id);
  throw new Error('Not implemented');
}

export async function createSecondary(dto: CreateSecondaryDto) {
  // TODO: return repo.create(dto);
  throw new Error('Not implemented');
}

export async function updateSecondary(id: string, dto: UpdateSecondaryDto) {
  // TODO: return repo.update(id, dto);
  throw new Error('Not implemented');
}

export async function deleteSecondary(id: string) {
  // TODO: return repo.remove(id);
  throw new Error('Not implemented');
}
