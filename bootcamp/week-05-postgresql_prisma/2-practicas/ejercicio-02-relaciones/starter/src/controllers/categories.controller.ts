import { Request, Response, NextFunction } from 'express';
import * as service from '../services/categories.service';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await service.listCategories());
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await service.getCategory(Number(req.params['id'])));
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ status: 'error', message: parsed.error.flatten() }); return; }
    res.status(201).json(await service.createCategory(parsed.data));
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = updateCategorySchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ status: 'error', message: parsed.error.flatten() }); return; }
    res.json(await service.updateCategory(Number(req.params['id']), parsed.data));
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.deleteCategory(Number(req.params['id']));
    res.status(204).send();
  } catch (err) { next(err); }
}
