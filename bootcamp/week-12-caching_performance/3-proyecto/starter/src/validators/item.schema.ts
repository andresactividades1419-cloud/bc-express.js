import { z } from 'zod';

// ============================================================
// TODO: Adaptar este schema al modelo de tu dominio
// ============================================================
// Agrega o elimina campos según tu dominio asignado.
// Ejemplos:
//   Biblioteca:  isbn, author, pages, genre
//   Farmacia:    activeIngredient, price, stock, prescription (boolean)
//   Restaurante: price, category, isAvailable (boolean)

export const createItemSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).default(0),
  category: z.string().max(60).optional(),
  // TODO: Agrega campos específicos del dominio aquí
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
