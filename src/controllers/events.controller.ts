import { Request, Response, NextFunction } from 'express';
import * as service from '../services/events.service';
import {
  createEventSchema,
  updateEventSchema,
  idSchema,
} from '../schemas/event.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = req.query['page'] ? Number(req.query['page']) : 1;
    const limit = req.query['limit'] ? Number(req.query['limit']) : 10;

    const result = await service.listEvents(page, limit);
    res.json(result);
  } catch (err: unknown) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parseId = idSchema.safeParse(req.params['id']);
    if (!parseId.success) {
      next(parseId.error);
      return;
    }

    const event = await service.getEventById(parseId.data);
    res.json({ data: event });
  } catch (err: unknown) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createEventSchema.safeParse(req.body);
    if (!parsed.success) {
      next(parsed.error);
      return;
    }

    const created = await service.createEvent(parsed.data);
    res.status(201).json({ data: created });
  } catch (err: unknown) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parseId = idSchema.safeParse(req.params['id']);
    if (!parseId.success) {
      next(parseId.error);
      return;
    }

    const parsed = updateEventSchema.safeParse(req.body);
    if (!parsed.success) {
      next(parsed.error);
      return;
    }

    const updated = await service.updateEvent(parseId.data, parsed.data);
    res.json({ data: updated });
  } catch (err: unknown) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parseId = idSchema.safeParse(req.params['id']);
    if (!parseId.success) {
      next(parseId.error);
      return;
    }

    await service.deleteEvent(parseId.data);
    res.status(204).send();
  } catch (err: unknown) {
    next(err);
  }
}
