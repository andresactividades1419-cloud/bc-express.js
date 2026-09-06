// ============================================
// SERVICE — Lógica de negocio con AppError
// ============================================
import { Event, PaginatedResponse } from '../types';
import * as repo from '../repositories/events.repository';
import { AppError } from '../errors/AppError';
import { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Event>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Event> {
  const item = await repo.findById(id);
  if (!item) {
    throw new AppError(404, `Event ${id} not found`);
  }
  return item;
}

export async function create(dto: CreateEventDto): Promise<Event> {
  return repo.create(dto);
}

export async function update(id: number, dto: UpdateEventDto): Promise<Event> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Event ${id} not found`);
  }
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Event ${id} not found`);
  }
  await repo.remove(id);
}
