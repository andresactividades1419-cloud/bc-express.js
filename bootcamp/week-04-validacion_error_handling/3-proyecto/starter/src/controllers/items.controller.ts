// ============================================
// CONTROLLER — delgado, maneja req/res, llama service
// ============================================
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/items.service';
import {
  createItemSchema,
  updateItemSchema,
  CreateItemDto,
  UpdateItemDto,
} from '../schemas/item.schema';
import { SingleResponse, PaginatedResponse } from '../types';

// Schema para validar :id param
const idSchema = z.coerce.number().int().positive({
  message: 'El id debe ser un número entero positivo',
});

// Helper para extraer issues de un ZodError — evitar duplicación
function formatIssues(error: z.ZodError): Array<{ field: string; message: string }> {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'id',
    message: issue.message,
  }));
}

// TODO: implementar getAll — listar con paginación
// Lee page y limit de req.query, llama service.findAll
export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: parsear page y limit de req.query con valores por defecto
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result satisfies PaginatedResponse<typeof result.data[number]>);
  } catch (err) {
    next(err);
  }
}

// TODO: implementar getById
// Validar :id con idSchema.safeParse → si falla, 400 con issues
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: usa idSchema.safeParse(req.params['id'])
    const parsed = idSchema.safeParse(req.params['id']);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsed.error),
      });
      return;
    }
    const item = await service.findById(parsed.data);
    res.json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

// TODO: implementar create
// Validar req.body con createItemSchema.safeParse → si falla, 400 con issues
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: usa createItemSchema.safeParse(req.body)
    const result = createItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Datos de entrada inválidos',
        issues: formatIssues(result.error),
      });
      return;
    }
    const dto: CreateItemDto = result.data;
    const item = await service.create(dto);
    res.status(201).json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

// TODO: implementar update
// Validar :id + req.body, ambos con safeParse
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: valida :id
    const parsedId = idSchema.safeParse(req.params['id']);
    if (!parsedId.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsedId.error),
      });
      return;
    }
    // TODO: valida req.body con updateItemSchema (partial)
    const result = updateItemSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Datos de entrada inválidos',
        issues: formatIssues(result.error),
      });
      return;
    }
    const dto: UpdateItemDto = result.data;
    const item = await service.update(parsedId.data, dto);
    res.json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

// TODO: implementar remove
// Validar :id con idSchema.safeParse → responder 204 si OK
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: valida :id
    const parsed = idSchema.safeParse(req.params['id']);
    if (!parsed.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsed.error),
      });
      return;
    }
    await service.remove(parsed.data);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
