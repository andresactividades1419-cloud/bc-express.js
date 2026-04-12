import { z } from 'zod';

// ============================================================
// TODO 2: Adaptar a tu dominio asignado
// ============================================================
// Renombra y ajusta los campos al modelo de tu entidad.
//
// Ejemplo — Dominio Biblioteca:
// export const createResourceSchema = z.object({
//   title: z.string().min(1),
//   author: z.string().min(1),
//   isbn: z.string().optional(),
// });
//
// Ejemplo — Dominio Farmacia:
// export const createResourceSchema = z.object({
//   name: z.string().min(1),
//   activeIngredient: z.string().min(1),
//   stock: z.number().int().nonnegative(),
// });
// ============================================================

export const createResourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

export const updateResourceSchema = createResourceSchema.partial();

export type CreateResourceDto = z.infer<typeof createResourceSchema>;
export type UpdateResourceDto = z.infer<typeof updateResourceSchema>;
