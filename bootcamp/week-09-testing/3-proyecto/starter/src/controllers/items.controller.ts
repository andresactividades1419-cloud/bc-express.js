import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import * as itemsService from '../services/items.service.js';
import { createItemSchema, updateItemSchema, itemIdSchema } from '../validators/items.schema.js';

export async function getAllHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await itemsService.getAll();
    res.status(200).json({ data: items, total: items.length });
  } catch (err) {
    next(err);
  }
}

export async function getByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { params } = itemIdSchema.parse({ params: req.params });
    const item = await itemsService.getById(params.id);
    res.status(200).json({ data: item });
  } catch (err) {
    if (err instanceof ZodError) return next(err);
    next(err);
  }
}

export async function createHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body } = createItemSchema.parse({ body: req.body });
    const user = res.locals['user'] as { sub: string };
    const item = await itemsService.create(body, user.sub);
    res.status(201).json({ data: item });
  } catch (err) {
    if (err instanceof ZodError) return next(err);
    next(err);
  }
}

export async function updateHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { params } = itemIdSchema.parse({ params: req.params });
    const { body } = updateItemSchema.parse({ body: req.body });
    const user = res.locals['user'] as { sub: string; role: string };
    const item = await itemsService.update(params.id, body, user.sub, user.role);
    res.status(200).json({ data: item });
  } catch (err) {
    if (err instanceof ZodError) return next(err);
    next(err);
  }
}

export async function deleteHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { params } = itemIdSchema.parse({ params: req.params });
    const user = res.locals['user'] as { sub: string; role: string };
    await itemsService.remove(params.id, user.sub, user.role);
    res.status(204).send();
  } catch (err) {
    if (err instanceof ZodError) return next(err);
    next(err);
  }
}
