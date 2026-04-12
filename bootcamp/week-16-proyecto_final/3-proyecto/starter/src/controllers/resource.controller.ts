import { Request, Response, NextFunction } from 'express';
// TODO 5: Importar el service de tu dominio
// import * as resourceService from '../services/resource.service';

// ============================================================
// TODO 5: Implementar los 5 handlers del CRUD
// ============================================================
// Cada handler debe:
// 1. Llamar al service correspondiente
// 2. Retornar el status code correcto
// 3. Pasar los errores a next(err) en lugar de catch vacíos
// ============================================================

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // TODO: const result = await resourceService.getAll({ page, limit });
    // res.json({ data: result.items, total: result.total, page, limit });

    res.json({ data: [], total: 0, page, limit }); // placeholder
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // TODO: const resource = await resourceService.getById(id);
    // if (!resource) return next(new AppError(404, 'Resource not found'));
    // res.json({ data: resource });

    res.json({ data: null }); // placeholder
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: const resource = await resourceService.create(req.body);
    // res.status(201).json({ data: resource });

    res.status(201).json({ data: null }); // placeholder
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // TODO: const resource = await resourceService.update(id, req.body);
    // res.json({ data: resource });

    res.json({ data: null }); // placeholder
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    // TODO: await resourceService.remove(id);
    // res.status(204).send();

    res.status(204).send(); // placeholder
  } catch (err) {
    next(err);
  }
}
