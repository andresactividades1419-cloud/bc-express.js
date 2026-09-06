import * as repo from '../repositories/clients.repository';
import type { CreateClientDto, UpdateClientDto } from '../schemas/client.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function create(dto: CreateClientDto) {
  return repo.create(dto);
}

export async function update(id: string, dto: UpdateClientDto) {
  return repo.update(id, dto);
}

export async function remove(id: string): Promise<void> {
  await repo.remove(id);
}
