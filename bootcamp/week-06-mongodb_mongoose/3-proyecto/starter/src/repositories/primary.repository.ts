// ============================================
// REPOSITORY: Entidad Principal (con populate)
// TODO: Implementar las funciones CRUD con populate()
// ============================================

import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Primary } from '../models/primary.model';
import { AppError } from '../errors/AppError';
import type { CreatePrimaryDto, UpdatePrimaryDto } from '../schemas/primary.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  // TODO: Implementar paginación con populate('secondary'):
  //   const skip = (page - 1) * limit;
  //   const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
  //   const [data, total] = await Promise.all([
  //     Primary.find(filter).populate('secondary').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  //     Primary.countDocuments(filter),
  //   ]);
  //   return { data, total, page, totalPages: Math.ceil(total / limit) };
  throw new AppError(501, 'Not implemented');
}

export async function findById(id: string): Promise<unknown> {
  // TODO: Buscar por id con .populate('secondary').lean()
  //       Lanzar AppError(404) si null
  //       Capturar CastError → AppError(400)
  throw new AppError(501, 'Not implemented');
}

export async function create(dto: CreatePrimaryDto): Promise<unknown> {
  // TODO: Crear documento con Primary.create(dto)
  //       Capturar error 11000 → AppError(409)
  //       Retornar product.toJSON()
  throw new AppError(501, 'Not implemented');
}

export async function update(id: string, dto: UpdatePrimaryDto): Promise<unknown> {
  // TODO: findByIdAndUpdate con { new: true, runValidators: true }
  //       Lanzar AppError(404) si null, capturar CastError y 11000
  throw new AppError(501, 'Not implemented');
}

export async function remove(id: string): Promise<void> {
  // TODO: findByIdAndDelete, lanzar AppError(404) si null
  //       Capturar CastError → AppError(400)
  throw new AppError(501, 'Not implemented');
}
