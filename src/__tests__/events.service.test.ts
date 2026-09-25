import * as eventsRepo from '../repositories/events.repository.js';
import * as eventsService from '../services/events.service.js';
import { AppError } from '../errors/AppError.js';
import type { IEvent } from '../models/event.model.js';

jest.mock('../repositories/events.repository.js');

const mockedRepo = eventsRepo as jest.Mocked<typeof eventsRepo>;

function buildEvent(overrides: Partial<IEvent> = {}): IEvent {
  return {
    _id: 'event-1',
    name: 'Festival Neon Lights 2026',
    code: 'FNL2026',
    category: 'festival',
    price: 250000,
    capacity: 18000,
    location: 'Parque Simón Bolívar, Bogotá',
    date: new Date('2026-11-15'),
    createdBy: 'user-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as IEvent;
}

describe('events.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listEvents', () => {
    it('returns all events from the repository', async () => {
      const events = [buildEvent(), buildEvent({ _id: 'event-2' } as unknown as Partial<IEvent>)];
      mockedRepo.findAllEvents.mockResolvedValue(events);

      const result = await eventsService.listEvents();

      expect(result).toEqual(events);
      expect(mockedRepo.findAllEvents).toHaveBeenCalledTimes(1);
    });
  });

  describe('getEvent', () => {
    it('returns the event when found', async () => {
      const event = buildEvent();
      mockedRepo.findEventById.mockResolvedValue(event);

      const result = await eventsService.getEvent('event-1');

      expect(result).toEqual(event);
    });

    it('throws AppError 404 when the event does not exist', async () => {
      mockedRepo.findEventById.mockResolvedValue(null);

      await expect(eventsService.getEvent('missing')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  describe('createEvent', () => {
    it('delegates creation to the repository with the requester as owner', async () => {
      const dto = {
        name: 'Boda Real Cardoza & Silva',
        code: 'BRCS01',
        category: 'boda' as const,
        price: 80000,
        capacity: 200,
        location: 'Hacienda Los Rosales',
        date: '2026-12-01',
      };
      const created = buildEvent({ ...dto, date: new Date(dto.date), createdBy: 'user-1' });
      mockedRepo.createEvent.mockResolvedValue(created);

      const result = await eventsService.createEvent(dto, 'user-1');

      expect(mockedRepo.createEvent).toHaveBeenCalledWith(dto, 'user-1');
      expect(result).toEqual(created);
    });
  });

  describe('updateEvent', () => {
    it('allows the owner to update their event', async () => {
      const existing = buildEvent({ createdBy: 'user-1' });
      const updated = buildEvent({ createdBy: 'user-1', name: 'Nuevo nombre' });
      mockedRepo.findEventById.mockResolvedValue(existing);
      mockedRepo.updateEvent.mockResolvedValue(updated);

      const result = await eventsService.updateEvent(
        'event-1',
        { name: 'Nuevo nombre' },
        'user-1',
        'user',
      );

      expect(result).toEqual(updated);
    });

    it('allows an admin to update an event they do not own', async () => {
      const existing = buildEvent({ createdBy: 'user-1' });
      const updated = buildEvent({ createdBy: 'user-1', name: 'Ajustado por admin' });
      mockedRepo.findEventById.mockResolvedValue(existing);
      mockedRepo.updateEvent.mockResolvedValue(updated);

      const result = await eventsService.updateEvent(
        'event-1',
        { name: 'Ajustado por admin' },
        'admin-1',
        'admin',
      );

      expect(result).toEqual(updated);
    });

    it('throws AppError 403 when a non-owner, non-admin tries to update', async () => {
      const existing = buildEvent({ createdBy: 'user-1' });
      mockedRepo.findEventById.mockResolvedValue(existing);

      await expect(
        eventsService.updateEvent('event-1', { name: 'Hackeado' }, 'user-2', 'user'),
      ).rejects.toMatchObject({ statusCode: 403 });
      expect(mockedRepo.updateEvent).not.toHaveBeenCalled();
    });

    it('throws AppError 404 when the event does not exist', async () => {
      mockedRepo.findEventById.mockResolvedValue(null);

      await expect(
        eventsService.updateEvent('missing', { name: 'X' }, 'user-1', 'user'),
      ).rejects.toMatchObject({ statusCode: 404 });
    });
  });

  describe('deleteEvent', () => {
    it('allows the owner to delete their event', async () => {
      const existing = buildEvent({ createdBy: 'user-1' });
      mockedRepo.findEventById.mockResolvedValue(existing);
      mockedRepo.deleteEvent.mockResolvedValue(existing);

      const result = await eventsService.deleteEvent('event-1', 'user-1', 'user');

      expect(result).toEqual(existing);
    });

    it('throws AppError 403 when a non-owner, non-admin tries to delete', async () => {
      const existing = buildEvent({ createdBy: 'user-1' });
      mockedRepo.findEventById.mockResolvedValue(existing);

      await expect(eventsService.deleteEvent('event-1', 'user-2', 'user')).rejects.toMatchObject({
        statusCode: 403,
      });
      expect(mockedRepo.deleteEvent).not.toHaveBeenCalled();
    });

    it('throws AppError 404 when the event does not exist', async () => {
      mockedRepo.findEventById.mockResolvedValue(null);

      await expect(eventsService.deleteEvent('missing', 'user-1', 'user')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });
});
