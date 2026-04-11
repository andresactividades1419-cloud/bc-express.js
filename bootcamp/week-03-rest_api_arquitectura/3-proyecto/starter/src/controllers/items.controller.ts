// ============================================
// CONTROLLER — Interfaz HTTP
// ============================================
// Reglas de esta capa:
// - Exactamente 3 pasos: extraer → llamar service → responder
// - Sin lógica de negocio (no ifs de dominio, no cálculos)
// - Maneja los 404 cuando el service retorna undefined
// - Siempre usar try/catch y pasar errores a next(err)
//
// TODO: Renombra "Item" e "items" por el modelo de tu dominio

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { CreateItemDto, UpdateItemDto } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Paso 1 — extraer page y limit de req.query (con fallbacks 1 y 10)
    // TODO: Paso 2 — llamar service.findAll({ page, limit })
    // TODO: Paso 3 — res.json(result)
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Paso 1 — extraer id de req.params, parsearlo a número
    // TODO: Paso 2 — llamar service.findById(id)
    // TODO: Paso 3 — si undefined → 404 ErrorResponse; si existe → { data: item }
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Paso 1 — extraer dto del req.body (tiparlo como CreateItemDto)
    // TODO: Paso 2 — llamar service.create(dto)
    // TODO: Paso 3 — res.status(201).json({ data: item })
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Paso 1 — extraer id de params y dto del body (UpdateItemDto)
    // TODO: Paso 2 — llamar service.update(id, dto)
    // TODO: Paso 3 — si undefined → 404; si exitoso → { data: updated }
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // TODO: Paso 1 — extraer id de params
    // TODO: Paso 2 — llamar service.remove(id)
    // TODO: Paso 3 — si false → 404; si true → res.status(204).send()
    next(new Error('Not implemented'));
  } catch (err) {
    next(err);
  }
}
