import { Request, Response, NextFunction } from 'express';
import * as service from '../services/clients.service';
import {
  createClientSchema,
  updateClientSchema,
  objectIdSchema,
} from '../schemas/client.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const clients = await service.getAll();
    res.json({ data: clients });
  } catch (err: unknown) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parseId = objectIdSchema.safeParse(req.params['id']);
    if (!parseId.success) {
      next(parseId.error);
      return;
    }

    const client = await service.getById(parseId.data);
    res.json({ data: client });
  } catch (err: unknown) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createClientSchema.safeParse(req.body);
    if (!parsed.success) {
      next(parsed.error);
      return;
    }

    const client = await service.create(parsed.data);
    res.status(201).json({ data: client });
  } catch (err: unknown) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parseId = objectIdSchema.safeParse(req.params['id']);
    if (!parseId.success) {
      next(parseId.error);
      return;
    }

    const parsed = updateClientSchema.safeParse(req.body);
    if (!parsed.success) {
      next(parsed.error);
      return;
    }

    const updated = await service.update(parseId.data, parsed.data);
    res.json({ data: updated });
  } catch (err: unknown) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parseId = objectIdSchema.safeParse(req.params['id']);
    if (!parseId.success) {
      next(parseId.error);
      return;
    }

    await service.remove(parseId.data);
    res.status(204).send();
  } catch (err: unknown) {
    next(err);
  }
}
