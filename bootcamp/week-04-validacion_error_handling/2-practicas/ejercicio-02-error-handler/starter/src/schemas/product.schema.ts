import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string({ required_error: 'name es obligatorio' }).min(1, 'name no puede estar vacío').trim(),
  price: z.number({ required_error: 'price es obligatorio' }).positive('price debe ser mayor a 0'),
  stock: z.number().int('stock debe ser entero').nonnegative('stock no puede ser negativo').default(0),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
