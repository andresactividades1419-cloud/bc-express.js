import { Request, Response, NextFunction } from 'express';
import * as itemsService from '../services/items.service';
import { createItemSchema } from '../validators/item.schema';
import { AppError } from '../errors/AppError';

// ============================================================
// TODO: Implementar los controladores de ítems.
//
// Cada controlador debe:
//   - Validar la entrada con Zod (ya tienes createItemSchema)
//   - Delegar al servicio correspondiente
//   - Retornar el status code correcto
//   - Capturar errores con next(error)
// ============================================================

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Obtener todos los ítems
  // Retornar { data: items }
  try {
    const items = await itemsService.getAll();
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Obtener ítem por id
  // Si no existe: 404
  try {
    const item = await itemsService.getById(req.params.id);
    res.json(item);
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Crear ítem y disparar notificación WS
  // Status 201 con el ítem creado
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    const dto = createItemSchema.parse(req.body);
    const item = await itemsService.create(dto, req.user.userId);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Eliminar ítem (solo el propietario)
  try {
    if (!req.user) throw new AppError(401, 'No autenticado');
    await itemsService.remove(req.params.id, req.user.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
