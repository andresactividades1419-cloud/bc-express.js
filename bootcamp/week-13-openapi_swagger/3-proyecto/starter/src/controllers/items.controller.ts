import { Request, Response, NextFunction } from 'express';
import { itemsService } from '../services/items.service';
import { createItemSchema, updateItemSchema } from '../validators/item.schema';

// ============================================================
// TODO: Documentar cada endpoint con bloques @openapi
// ============================================================
// Agrega un bloque JSDoc ANTES de cada función export.
// Referencia: 1-teoria/03-documentar-rutas.md
//
// Guía para cada endpoint:
//
// getAll  → GET /api/v1/items — público (security: [])
//           query params: page (integer, default 1), limit (integer, default 20)
//           respuesta 200: { data: Item[], total, page, limit }
//
// getById → GET /api/v1/items/{id} — público (security: [])
//           path param: id (string)
//           respuestas: 200 (Item) | 404 (Error)
//
// create  → POST /api/v1/items — protegido (security: [{BearerAuth: []}])
//           requestBody: $ref CreateItemDto
//           respuestas: 201 (Item) | 400 (Error) | 401 (Error)
//
// update  → PUT /api/v1/items/{id} — protegido
//           path param: id + requestBody: $ref UpdateItemDto
//           respuestas: 200 (Item) | 400 | 401 | 404
//
// remove  → DELETE /api/v1/items/{id} — protegido
//           path param: id
//           respuestas: 204 (sin content!) | 401 | 404

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page  = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await itemsService.getAll(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await itemsService.getById(req.params.id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createItemSchema.parse(req.body);
    const item = await itemsService.create(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updateItemSchema.parse(req.body);
    const item = await itemsService.update(req.params.id, dto);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await itemsService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
