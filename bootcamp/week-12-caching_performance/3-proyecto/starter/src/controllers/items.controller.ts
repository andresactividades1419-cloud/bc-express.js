import { Request, Response, NextFunction } from 'express';
import { itemsService } from '../services/items.service';
import { createItemSchema, updateItemSchema } from '../validators/item.schema';
import { paginatedQuerySchema } from '../validators/pagination.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Parsear query params con paginatedQuerySchema y llamar itemsService.findMany
    const params = paginatedQuerySchema.parse(req.query);
    const result = await itemsService.findMany(params);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await itemsService.findById(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Parsear body con createItemSchema y llamar itemsService.create
    const dto = createItemSchema.parse(req.body);
    const item = await itemsService.create(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Parsear body con updateItemSchema y llamar itemsService.update
    const dto = updateItemSchema.parse(req.body);
    const item = await itemsService.update(req.params.id, dto);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await itemsService.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
