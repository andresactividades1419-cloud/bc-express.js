// ============================================
// REPOSITORY: Entidad Secundaria
// TODO: Implementar las funciones CRUD
// ============================================

import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Secondary } from '../models/secondary.model';
import { AppError } from '../errors/AppError';
import type { CreateSecondaryDto, UpdateSecondaryDto } from '../schemas/secondary.schema';

export async function findAll(): Promise<unknown[]> {
  // TODO: Retornar todos los documentos ordenados por name ASC usando .lean()
  // Hint: Secondary.find().sort({ name: 1 }).lean()
  throw new AppError(501, 'Not implemented');
}

export async function findById(id: string): Promise<unknown> {
  // TODO: Buscar por id, lanzar AppError(404) si no existe
  //       Capturar CastError → AppError(400, 'ID inválido')
  // Hint: Secondary.findById(id).lean()
  throw new AppError(501, 'Not implemented');
}

export async function create(dto: CreateSecondaryDto): Promise<unknown> {
  // TODO: Crear documento con Secondary.create(dto)
  //       Capturar error 11000 → AppError(409, 'Ya existe...')
  throw new AppError(501, 'Not implemented');
}

export async function update(id: string, dto: UpdateSecondaryDto): Promise<unknown> {
  // TODO: Actualizar con findByIdAndUpdate(id, dto, { new: true, runValidators: true })
  //       Lanzar AppError(404) si retorna null
  //       Capturar CastError → AppError(400)
  throw new AppError(501, 'Not implemented');
}

export async function remove(id: string): Promise<void> {
  // TODO: Eliminar con findByIdAndDelete(id)
  //       Lanzar AppError(404) si retorna null
  //       Capturar CastError → AppError(400)
  throw new AppError(501, 'Not implemented');
}
