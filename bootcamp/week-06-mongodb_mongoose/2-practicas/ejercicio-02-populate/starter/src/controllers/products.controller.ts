import { Request, Response, NextFunction } from 'express';
import * as service from '../services/products.service';
import {
  createProductSchema,
  updateProductSchema,
  objectIdSchema,
} from '../schemas/product.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = Number(req.query['page'])  || 1;
    const limit = Number(req.query['limit']) || 10;
    const search = req.query['search'] as string | undefined;
    const result = await service.getAll(page, limit, search);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const product = await service.getById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createProductSchema.parse(req.body);
    const product = await service.createProduct(dto);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id  = objectIdSchema.parse(req.params['id']);
    const dto = updateProductSchema.parse(req.body);
    const product = await service.updateProduct(id, dto);
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
