import { EventModel, type IEvent } from '../models/event.model.js';
import type { CreateEventDto, UpdateEventDto } from '../types/index.js';

// ============================================================
// REPOSITORIO DE EVENTOS — capa de acceso a datos
// ============================================================
// En los unit tests, ESTE modulo se mockea con jest.mock().
// En los integration tests, accede a MongoDB Memory Server.
// ============================================================

export async function findAllEvents(createdBy?: string): Promise<IEvent[]> {
  const filter = createdBy ? { createdBy } : {};
  return EventModel.find(filter).lean<IEvent[]>().exec();
}

export async function findEventById(id: string): Promise<IEvent | null> {
  return EventModel.findById(id).lean<IEvent>().exec();
}

export async function createEvent(
  dto: CreateEventDto,
  createdBy: string,
): Promise<IEvent> {
  const event = new EventModel({ ...dto, date: new Date(dto.date), createdBy });
  return event.save() as unknown as IEvent;
}

export async function updateEvent(
  id: string,
  dto: UpdateEventDto,
): Promise<IEvent | null> {
  const payload: Record<string, unknown> = { ...dto };
  if (dto.date) payload['date'] = new Date(dto.date);
  return EventModel.findByIdAndUpdate(id, payload, { new: true }).lean<IEvent>().exec();
}

export async function deleteEvent(id: string): Promise<IEvent | null> {
  return EventModel.findByIdAndDelete(id).lean<IEvent>().exec();
}
