import { Event, IEvent } from '../models/event.model.js';
import type { CreateEventDto, UpdateEventDto } from '../schemas/event.schema.js';

export interface EventFilters {
  category?: string;
  active?: boolean;
}

export async function findAll(filters: EventFilters = {}): Promise<IEvent[]> {
  const query: Record<string, unknown> = {};
  if (filters.category) query['category'] = filters.category;
  if (filters.active !== undefined) query['active'] = filters.active;

  return Event.find(query).sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IEvent | null> {
  return Event.findById(id);
}

export async function create(data: CreateEventDto, userId: string): Promise<IEvent> {
  // createdBy guarda quien creo el evento (para autorizacion posterior)
  return Event.create({ ...data, date: new Date(data.date), createdBy: userId });
}

export async function update(
  id: string,
  data: UpdateEventDto,
  requesterId: string,
  requesterRole: string
): Promise<IEvent | null> {
  const event = await Event.findById(id);
  if (!event) return null;

  // Un usuario solo puede editar SU evento; admin puede editar cualquiera
  if (requesterRole !== 'admin' && event.createdBy !== requesterId) {
    throw new Error('FORBIDDEN'); // capturado en el controller -> AppError(403)
  }

  const updatePayload: Record<string, unknown> = { ...data };
  if (data.date) updatePayload['date'] = new Date(data.date);

  return Event.findByIdAndUpdate(id, updatePayload, { new: true });
}

export async function remove(id: string): Promise<IEvent | null> {
  // La restriccion de "solo admin" ya se aplica en la ruta (requireRole)
  return Event.findByIdAndDelete(id);
}
