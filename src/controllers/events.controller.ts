// ============================================
// CONTROLLER — Delgado, maneja req/res, llama service
// ============================================
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/events.service';
import {
  createEventSchema,
  updateEventSchema,
  CreateEventDto,
  UpdateEventDto,
} from '../schemas/event.schema';
import { SingleResponse, PaginatedResponse } from '../types';

// Schema para validar :id param
const idSchema = z.coerce.number().int().positive({
  message: 'El id debe ser un número entero positivo',
});

// Helper para extraer issues de un ZodError
function formatIssues(error: z.ZodError): Array<{ field: string; message: string }> {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || 'id',
    message: issue.message,
  }));
}

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query['page']) || 1);
    const limit = Math.max(1, Number(req.query['limit']) || 10);
    const result = await service.findAll({ page, limit });
    res.json(result satisfies PaginatedResponse<typeof result.data[number]>);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
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

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = createEventSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Datos de entrada inválidos',
        issues: formatIssues(result.error),
      });
      return;
    }

    const dto: CreateEventDto = result.data;
    const item = await service.create(dto);
    res.status(201).json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsedId = idSchema.safeParse(req.params['id']);
    if (!parsedId.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Parámetro inválido',
        issues: formatIssues(parsedId.error),
      });
      return;
    }

    const result = updateEventSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: 'Validation Error',
        message: 'Datos de entrada inválidos',
        issues: formatIssues(result.error),
      });
      return;
    }

    const dto: UpdateEventDto = result.data;
    const item = await service.update(parsedId.data, dto);
    res.json({ data: item } satisfies SingleResponse<typeof item>);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
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
