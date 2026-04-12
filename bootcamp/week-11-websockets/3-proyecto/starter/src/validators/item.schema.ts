import { z } from 'zod';

// ============================================================
// TODO: Adaptar este schema Zod a los campos de tu dominio.
//
// Ejemplos:
//   - Biblioteca:  { title: string, author: string, isbn: string }
//   - Farmacia:    { name: string, stock: number, price: number }
//   - Gimnasio:    { name: string, duration: number, level: string }
// ============================================================

export const createItemSchema = z.object({
  // TODO: Reemplaza estos campos por los de tu dominio con validaciones Zod
  name: z.string().min(1, 'El nombre es requerido').max(200),
  description: z.string().max(1000).optional().default(''),
  // TODO: Agrega más campos según tu dominio
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
