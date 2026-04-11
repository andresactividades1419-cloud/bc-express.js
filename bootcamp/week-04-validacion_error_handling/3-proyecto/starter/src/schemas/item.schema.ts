// ============================================
// SCHEMAS — adapta al recurso de tu dominio
// ============================================
import { z } from 'zod';

// TODO: adapta los campos a tu dominio asignado
// Ejemplo: si tu dominio es Biblioteca, usa title, author, isbn, stock
// Si es Farmacia: name, dosage, price, stock
// Si es Gimnasio: name, email, plan, etc.

// TODO: implementar createItemSchema con z.object() y validaciones apropiadas
// Requisitos mínimos:
// - Al menos 3 campos obligatorios con validaciones de tipo y rango
// - Al menos 1 campo con mensaje de error personalizado
// - Al menos 1 campo numérico con .positive() o .nonnegative()
// - Al menos 1 campo opcional o con .default()
export const createItemSchema = z.object({
  name: z.string({ required_error: 'name es obligatorio' }).min(1, 'name no puede estar vacío').trim(),
  description: z.string().min(1).trim().default(''),
  price: z.number({ required_error: 'price es obligatorio' }).positive('price debe ser mayor a 0'),
  stock: z.number().int('stock debe ser entero').nonnegative('stock no puede ser negativo').default(0),
  // TODO: añade o modifica campos según tu dominio
});

// TODO: reutiliza createItemSchema con .partial() para actualizaciones parciales
export const updateItemSchema = createItemSchema.partial();

// TODO: inferir los tipos desde los schemas (single source of truth)
export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
