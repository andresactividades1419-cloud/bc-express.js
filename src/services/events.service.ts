import { eventsRepository } from '../repositories/events.repository.js';
import { CreateEventDto, UpdateEventDto } from '../schemas/event.schema.js';
import { AppError } from '../errors/AppError.js';

export class EventsService {
  async getAll(filter: Record<string, unknown> = {}) {
    return eventsRepository.findAll(filter);
  }

  async getById(id: string) {
    const event = await eventsRepository.findById(id);
    if (!event) {
      throw new AppError('Evento no encontrado', 404);
    }
    return event;
  }

  async create(input: CreateEventDto, userId: string) {
    return eventsRepository.create({
      ...input,
      createdBy: userId
    });
  }

  async update(id: string, input: UpdateEventDto) {
    const updated = await eventsRepository.updateById(id, input);
    if (!updated) {
      throw new AppError('Evento no encontrado', 404);
    }
    return updated;
  }

  async delete(id: string) {
    const deleted = await eventsRepository.deleteById(id);
    if (!deleted) {
      throw new AppError('Evento no encontrado', 404);
    }
    return deleted;
  }
}

export const eventsService = new EventsService();
