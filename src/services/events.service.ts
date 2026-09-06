import * as eventsRepo from '../repositories/events.repository';
import * as clientsRepo from '../repositories/clients.repository';
import { AppError } from '../errors/AppError';
import type { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export async function getAll(page: number, limit: number, search?: string) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);

  return eventsRepo.findAll(safePage, safeLimit, search);
}

export async function getById(id: string) {
  return eventsRepo.findById(id);
}

export async function create(dto: CreateEventDto) {
  // Verificar que el cliente referenciado exista en la base de datos
  const clientExists = await clientsRepo.findById(dto.client);
  if (!clientExists) {
    throw new AppError(400, 'El cliente referenciado en el evento no existe en la base de datos');
  }

  return eventsRepo.create(dto);
}

export async function update(id: string, dto: UpdateEventDto) {
  if (dto.client) {
    const clientExists = await clientsRepo.findById(dto.client);
    if (!clientExists) {
      throw new AppError(400, 'El cliente referenciado en la actualización no existe en la base de datos');
    }
  }

  return eventsRepo.update(id, dto);
}

export async function remove(id: string): Promise<void> {
  await eventsRepo.remove(id);
}
