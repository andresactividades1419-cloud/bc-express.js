import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
