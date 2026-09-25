import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import * as eventsService from '../services/events.service.js';
import { createEventSchema, updateEventSchema } from '../validators/events.schema.js';

export async function listEventsHandler(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const events = await eventsService.listEvents();
    res.status(200).json({ data: events });
  } catch (err) {
    next(err);
  }
}

export async function getEventHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event = await eventsService.getEvent(req.params['id'] as string);
    res.status(200).json({ data: event });
  } catch (err) {
    next(err);
  }
}

export async function createEventHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body } = createEventSchema.parse({ body: req.body });
    const user = res.locals['user'] as { sub: string };
    const event = await eventsService.createEvent(body, user.sub);
    res.status(201).json({ data: event });
  } catch (err) {
    if (err instanceof ZodError) return next(err);
    next(err);
  }
}

export async function updateEventHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body } = updateEventSchema.parse({ body: req.body });
    const user = res.locals['user'] as { sub: string; role: string };
    const event = await eventsService.updateEvent(req.params['id'] as string, body, user.sub, user.role);
    res.status(200).json({ data: event });
  } catch (err) {
    if (err instanceof ZodError) return next(err);
    next(err);
  }
}

export async function deleteEventHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = res.locals['user'] as { sub: string; role: string };
    await eventsService.deleteEvent(req.params['id'] as string, user.sub, user.role);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
