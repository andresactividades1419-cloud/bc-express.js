import * as repo from '../repositories/categories.repository';
import type { CreateCategoryDto, UpdateCategoryDto } from '../schemas/category.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createCategory(dto: CreateCategoryDto) {
  return repo.create(dto);
}

export async function updateCategory(id: string, dto: UpdateCategoryDto) {
  return repo.update(id, dto);
}

export async function deleteCategory(id: string) {
  return repo.remove(id);
}
