import * as repo from '../repositories/events.repository';
import { AppError } from '../errors/AppError';
import { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export async function listEvents(page: number, limit: number) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.min(Math.max(1, limit), 100);

  return repo.findAll(safePage, safeLimit);
}

export async function getEventById(id: string) {
  const event = await repo.findById(id);
  if (!event) {
    throw new AppError(404, `Evento con ID ${id} no encontrado`);
  }
  return event;
}

export async function createEvent(data: CreateEventDto) {
  return repo.create(data);
}

export async function updateEvent(id: string, data: UpdateEventDto) {
  // Asegurar que exista antes de actualizar
  await getEventById(id);
  return repo.update(id, data);
}

export async function deleteEvent(id: string): Promise<void> {
  // Asegurar que exista antes de eliminar
  await getEventById(id);
  await repo.remove(id);
}
