// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Reglas de esta capa:
// - Exactamente 3 pasos: extraer parámetros/body → llamar service → responder
// - Sin lógica de negocio ni cálculos
// - Maneja el 404 cuando el service retorna undefined
// - Siempre usar try/catch y pasar excepciones a next(err)

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/events.service';
import {
  CreateEventDto,
  UpdateEventDto,
  SingleResponse,
  PaginatedResponse,
  ErrorResponse,
  Event,
} from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1: extraer query params de paginación
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string, 10) || 10);

    // Paso 2: llamar service
    const result: PaginatedResponse<Event> = await service.findAll({ page, limit });

    // Paso 3: responder con status 200 y JSON paginado
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1: extraer y parsear ID
    const id = parseInt(req.params.id as string, 10);

    // Paso 2: llamar service
    const item = await service.findById(id);

    // Paso 3: responder según resultado
    if (!item) {
      const errorBody: ErrorResponse = {
        error: 'Not Found',
        message: `Event ${id} not found`,
      };
      res.status(404).json(errorBody);
      return;
    }

    const response: SingleResponse<Event> = { data: item };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1: extraer dto del body
    const dto: CreateEventDto = req.body;

    // Paso 2: llamar service
    const item = await service.create(dto);

    // Paso 3: responder con status 201 Created y { data: item }
    const response: SingleResponse<Event> = { data: item };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1: extraer id de params y dto del body
    const id = parseInt(req.params.id as string, 10);
    const dto: UpdateEventDto = req.body;

    // Paso 2: llamar service
    const updated = await service.update(id, dto);

    // Paso 3: responder según resultado
    if (!updated) {
      const errorBody: ErrorResponse = {
        error: 'Not Found',
        message: `Event ${id} not found`,
      };
      res.status(404).json(errorBody);
      return;
    }

    const response: SingleResponse<Event> = { data: updated };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 1: extraer id de params
    const id = parseInt(req.params.id as string, 10);

    // Paso 2: llamar service
    const removed = await service.remove(id);

    // Paso 3: responder con 204 No Content o 404 Not Found
    if (!removed) {
      const errorBody: ErrorResponse = {
        error: 'Not Found',
        message: `Event ${id} not found`,
      };
      res.status(404).json(errorBody);
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
