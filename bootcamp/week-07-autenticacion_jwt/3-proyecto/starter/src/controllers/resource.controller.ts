import { Request, Response, NextFunction } from 'express';
import * as resourceService from '../services/resource.service';
import { createResourceSchema, updateResourceSchema } from '../schemas/resource.schema';

// ============================================
// CONTROLADOR DEL RECURSO PRINCIPAL
// ============================================
// Implementa los handlers de cada ruta CRUD.
// Valida con Zod, delega al servicio y maneja la respuesta HTTP.
// ============================================

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Llamar a resourceService.getAll()
  // Responder con 200 y array de recursos
  try {
    throw new Error('getAll no implementado');
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Obtener req.params.id
  // Llamar a resourceService.getById(id)
  // Responder con 200 y el recurso (el servicio lanza 404 si no existe)
  try {
    throw new Error('getById no implementado');
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Parsear req.body con createResourceSchema.parse()
  // Obtener userId desde req.user!.sub
  // Llamar a resourceService.create(dto, userId)
  // Responder con 201 y el recurso creado
  try {
    throw new Error('create no implementado');
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Parsear req.body con updateResourceSchema.parse()
  // Obtener req.params.id
  // Llamar a resourceService.update(id, dto)
  // Responder con 200 y el recurso actualizado
  try {
    throw new Error('update no implementado');
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  // TODO: Obtener req.params.id
  // Llamar a resourceService.remove(id)
  // Responder con 204 (sin body)
  try {
    throw new Error('remove no implementado');
  } catch (err) {
    next(err);
  }
}
