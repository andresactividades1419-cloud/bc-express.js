// ============================================
// CONTROLLER: Entidad Principal
// TODO: Implementar handlers req/res
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/primary.service';
import {
  createPrimarySchema,
  updatePrimarySchema,
  objectIdSchema,
} from '../schemas/primary.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Leer page, limit, search de req.query y llamar service.getAll()
    // Hint:
    //   const page  = Number(req.query['page'])  || 1;
    //   const limit = Number(req.query['limit']) || 10;
    //   const search = req.query['search'] as string | undefined;
    //   const result = await service.getAll(page, limit, search);
    //   res.json(result);
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Validar id con objectIdSchema, obtener item y res.json(item)
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Parsear body con createPrimarySchema, crear y retornar 201
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
