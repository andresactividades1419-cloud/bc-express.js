import { z } from 'zod';

// ============================================================
// SCHEMAS ZOD — adaptar al dominio asignado
// ============================================================

export const createItemSchema = z.object({
  body: z.object({
    // TODO: Adaptar campos al dominio
    // Ejemplo biblioteca:
    //   title: z.string().min(1).max(200),
    //   isbn: z.string().regex(/^[\d-]{10,17}$/),
    //   authorId: z.string(),
    // Ejemplo farmacia:
    //   name: z.string().min(2),
    //   activeIngredient: z.string(),
    //   stock: z.number().int().min(0),
    name:        z.string().min(2).max(200),
    description: z.string().max(1000).optional(),
  }),
});

export const updateItemSchema = z.object({
  body: z.object({
    // TODO: Todos los campos opcionales en update
    name:        z.string().min(2).max(200).optional(),
    description: z.string().max(1000).optional(),
  }),
});

export const itemIdSchema = z.object({
  params: z.object({
    id: z.string().length(24, 'Invalid MongoDB ID'),
  }),
});
