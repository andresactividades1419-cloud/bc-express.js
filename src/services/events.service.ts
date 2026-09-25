import { AppError } from '../errors/AppError.js';
import type { CreateEventDto, UpdateEventDto } from '../types/index.js';
import * as eventsRepo from '../repositories/events.repository.js';

// ============================================================
// SERVICIO DE EVENTOS — reglas de negocio
// ============================================================

export async function listEvents() {
  return eventsRepo.findAllEvents();
}

export async function getEvent(id: string) {
  const event = await eventsRepo.findEventById(id);
  if (!event) throw new AppError(404, 'Event not found');
  return event;
}

export async function createEvent(dto: CreateEventDto, createdBy: string) {
  return eventsRepo.createEvent(dto, createdBy);
}

export async function updateEvent(
  id: string,
  dto: UpdateEventDto,
  requesterId: string,
  requesterRole: string,
) {
  const existing = await eventsRepo.findEventById(id);
  if (!existing) throw new AppError(404, 'Event not found');

  if (existing.createdBy !== requesterId && requesterRole !== 'admin') {
    throw new AppError(403, 'Insufficient permissions');
  }

  const updated = await eventsRepo.updateEvent(id, dto);
  if (!updated) throw new AppError(404, 'Event not found');
  return updated;
}

export async function deleteEvent(id: string, requesterId: string, requesterRole: string) {
  const existing = await eventsRepo.findEventById(id);
  if (!existing) throw new AppError(404, 'Event not found');

  if (existing.createdBy !== requesterId && requesterRole !== 'admin') {
    throw new AppError(403, 'Insufficient permissions');
  }

  const deleted = await eventsRepo.deleteEvent(id);
  if (!deleted) throw new AppError(404, 'Event not found');
  return deleted;
}
