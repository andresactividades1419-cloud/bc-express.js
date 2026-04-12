// src/controllers/items.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as itemsService from '../services/items.service';
import { createItemSchema, updateItemSchema } from '../validators/items.schema';
import { AppError } from '../errors/AppError';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const items = await itemsService.getAll(req.user.userId);
    res.json({ status: 'success', data: { items } });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await itemsService.getById(req.params.id);
    res.json({ status: 'success', data: { item } });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const { body } = createItemSchema.parse({ body: req.body });
    const item = await itemsService.create(body, req.user.userId, req.file);
    res.status(201).json({ status: 'success', data: { item } });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const { body } = updateItemSchema.parse({ body: req.body });
    const item = await itemsService.update(req.params.id, req.user.userId, body);
    res.json({ status: 'success', data: { item } });
  } catch (err) {
    next(err);
  }
}

export async function updateImage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    if (!req.file) throw new AppError(400, 'No se proporcionó ninguna imagen');
    const item = await itemsService.updateImage(req.params.id, req.user.userId, req.file);
    res.json({ status: 'success', data: { item } });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    await itemsService.remove(req.params.id, req.user.userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
