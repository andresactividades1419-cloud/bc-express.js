import { Request, Response } from 'express';
import { z } from 'zod';
import * as store from '../data/products';

const createSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  stock: z.number().int().min(0).default(0),
});

export function getAll(_req: Request, res: Response): void {
  res.json(store.findAll());
}

export function getById(req: Request, res: Response): void {
  const product = store.findById(req.params.id);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.json(product);
}

export function create(req: Request, res: Response): void {
  const result = createSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid input', issues: result.error.flatten().fieldErrors });
    return;
  }
  const product = store.create(result.data);
  res.status(201).json(product);
}

export function remove(req: Request, res: Response): void {
  const deleted = store.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  res.status(204).send();
}
