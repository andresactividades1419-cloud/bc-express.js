// ============================================
// CONTROLLER: Entidad Secundaria
// TODO: Implementar handlers req/res
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/secondary.service';
import {
  createSecondarySchema,
  updateSecondarySchema,
} from '../schemas/secondary.schema';
import { objectIdSchema } from '../schemas/primary.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: const items = await service.getAll(); res.json(items);
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Validar objectIdSchema, llamar service.getById(id), res.json(item)
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Parsear body con createSecondarySchema, crear y retornar 201
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Validar id y body, actualizar y retornar 200
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Validar id, eliminar y retornar 204
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}
