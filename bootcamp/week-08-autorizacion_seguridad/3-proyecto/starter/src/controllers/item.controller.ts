import { Request, Response, NextFunction } from 'express';
import * as itemService from '../services/item.service.js';
import { createItemSchema, updateItemSchema } from '../schemas/item.schema.js';
import { AppError } from '../errors/AppError.js';

// ============================================
// TODO: Renombra estas funciones a tu dominio
// ============================================
// Ejemplos: getBooks, createBook, updateBook, deleteBook
//           getMedicines, createMedicine, etc.

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implementar listado de recursos del dominio
  try {
    const items = await itemService.findAll();
    res.json({ data: items, total: items.length });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implementar búsqueda por ID
  // Retornar 404 si no existe
  try {
    const item = await itemService.findById(req.params.id);
    if (!item) throw new AppError(404, 'Item not found');
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implementar creación validando con Zod
  // req.user está disponible (authMiddleware ya validó el token)
  try {
    if (!req.user) throw new AppError(401, 'Not authenticated');

    const { body } = createItemSchema.parse({ body: req.body });
    const item = await itemService.create(body, req.user.sub);
    res.status(201).json({ message: 'Item created', data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implementar actualización
  // Verificar que el usuario sea el dueño O sea admin
  try {
    if (!req.user) throw new AppError(401, 'Not authenticated');

    const { body } = updateItemSchema.parse({ body: req.body });
    const item = await itemService.update(
      req.params.id,
      body,
      req.user.sub,
      req.user.role as string
    );

    if (!item) throw new AppError(404, 'Item not found');
    res.json({ message: 'Item updated', data: item });
  } catch (err) {
    // TODO: Manejar el error 'FORBIDDEN' del service
    // if (err instanceof Error && err.message === 'FORBIDDEN') {
    //   return next(new AppError(403, 'You can only update your own resources'));
    // }
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Implementar eliminación (solo admin — enforced en la ruta)
  try {
    const item = await itemService.remove(req.params.id);
    if (!item) throw new AppError(404, 'Item not found');
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
}
