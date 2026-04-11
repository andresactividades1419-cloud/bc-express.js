import { MongoServerError } from 'mongodb';
import { Category } from '../models/category.model';
import { AppError } from '../errors/AppError';
import type { CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schema';

export async function findAll(): Promise<unknown[]> {
  return Category.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  const category = await Category.findById(id).lean();
  if (!category) throw new AppError(404, 'Categoría no encontrada');
  return category;
}

export async function create(dto: CreateCategoryDto): Promise<unknown> {
  try {
    const category = await Category.create(dto);
    return category.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una categoría con ese nombre');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateCategoryDto): Promise<unknown> {
  const category = await Category.findByIdAndUpdate(id, dto, {
    new: true,
    runValidators: true,
  }).lean();
  if (!category) throw new AppError(404, 'Categoría no encontrada');
  return category;
}

export async function remove(id: string): Promise<void> {
  const category = await Category.findByIdAndDelete(id).lean();
  if (!category) throw new AppError(404, 'Categoría no encontrada');
}
