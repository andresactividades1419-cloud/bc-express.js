import { Request, Response, NextFunction } from 'express';
import * as service from '../services/products.service';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query['limit']) || 10));
    res.json(await service.listProducts(page, limit));
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json(await service.getProduct(Number(req.params['id'])));
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ status: 'error', message: parsed.error.flatten() }); return; }
    res.status(201).json(await service.createProduct(parsed.data));
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ status: 'error', message: parsed.error.flatten() }); return; }
    res.json(await service.updateProduct(Number(req.params['id']), parsed.data));
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await service.deleteProduct(Number(req.params['id']));
    res.status(204).send();
  } catch (err) { next(err); }
}
