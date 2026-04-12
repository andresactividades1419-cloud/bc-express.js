import { z } from 'zod';

// TODO: Adapta estos schemas a tu dominio asignado.
// Los campos deben coincidir con los de tu modelo Prisma.

export const createItemSchema = z.object({
  name:        z.string().min(2),
  description: z.string().optional(),
  price:       z.number().min(0).default(0),
  stock:       z.number().int().min(0).default(0),
});

export const updateItemSchema = z.object({
  name:        z.string().min(2).optional(),
  description: z.string().optional(),
  price:       z.number().min(0).optional(),
  stock:       z.number().int().min(0).optional(),
  active:      z.boolean().optional(),
});

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
