// ============================================
// SCHEMAS — Paso 1: definir schemas Zod
// ============================================
// Con Zod, el schema ES la fuente de verdad.
// Los tipos DTO se infieren automáticamente.
// No necesitas declarar interfaces separadas.
//
// Descomenta el bloque "PASO 1" cuando llegues a este paso.

import { z } from 'zod';

// ============================================
// PASO 1: Descomenta el bloque siguiente
// ============================================
// export const createProductSchema = z.object({
//   // name: string, al menos 1 carácter, sin espacios extra
//   name: z.string().min(1, 'El nombre es requerido').max(100).trim(),
//
//   // price: número positivo (mayor a 0)
//   price: z.number({ message: 'El precio debe ser un número' }).positive('Debe ser mayor a 0'),
//
//   // stock: entero, no negativo, valor por defecto 0 si no se envía
//   stock: z.number().int('Debe ser un número entero').nonnegative('No puede ser negativo').default(0),
// });
//
// // updateProductSchema = todos los campos opcionales
// // .partial() hace que cada campo sea opcional sin duplicar código
// export const updateProductSchema = createProductSchema.partial();
//
// // z.infer extrae el tipo TypeScript del schema automáticamente
// export type CreateProductDto = z.infer<typeof createProductSchema>;
// export type UpdateProductDto = z.infer<typeof updateProductSchema>;
