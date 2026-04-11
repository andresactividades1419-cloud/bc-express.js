// src/schemas/product.schema.ts — Validación Zod para Product
// Usados: createProductSchema (POST), updateProductSchema (PUT)

import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  description: z.string().max(500).optional(),
  price: z.number().positive('El precio debe ser mayor a 0'),
  stock: z.number().int().min(0).default(0),
  sku: z
    .string()
    .min(1, 'El SKU es requerido')
    .max(50)
    .regex(/^[A-Z0-9-]+$/, 'SKU solo puede tener letras mayúsculas, números y guiones'),
  active: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
