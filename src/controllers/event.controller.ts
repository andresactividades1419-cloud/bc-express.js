import { Request, Response, NextFunction } from 'express';
import * as eventService from '../services/event.service.js';
import { createEventSchema, updateEventSchema } from '../schemas/event.schema.js';
import { AppError } from '../errors/AppError.js';

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, active } = req.query;
    const events = await eventService.findAll({
      category: typeof category === 'string' ? category : undefined,
      active: active === undefined ? undefined : active === 'true',
    });
    res.json({ data: events, total: events.length });
  } catch (err) {
    next(err);
  }
}

export async function getEventById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const event = await eventService.findById(req.params.id);
    if (!event) throw new AppError(404, 'Event not found');
    res.json({ data: event });
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'Not authenticated');

    const { body } = createEventSchema.parse({ body: req.body });
    const event = await eventService.create(body, req.user.sub);
    res.status(201).json({ message: 'Event created', data: event });
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'Not authenticated');

    const { body } = updateEventSchema.parse({ body: req.body });
    const event = await eventService.update(
      req.params.id,
      body,
      req.user.sub,
      req.user.role as string
    );

    if (!event) throw new AppError(404, 'Event not found');
    res.json({ message: 'Event updated', data: event });
  } catch (err) {
    if (err instanceof Error && err.message === 'FORBIDDEN') {
      return next(new AppError(403, 'You can only update your own events'));
    }
    next(err);
  }
}

export async function deleteEvent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const event = await eventService.remove(req.params.id);
    if (!event) throw new AppError(404, 'Event not found');
    res.json({ message: 'Event deleted' });
  } catch (err) {
    next(err);
  }
}
