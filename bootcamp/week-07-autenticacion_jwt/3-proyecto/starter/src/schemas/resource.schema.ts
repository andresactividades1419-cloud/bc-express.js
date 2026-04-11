import { z } from 'zod';

// ============================================
// SCHEMA DEL RECURSO PRINCIPAL
// ============================================
// Adapta este schema al recurso de tu dominio asignado.
//
// Ejemplos:
// - Biblioteca: título, autor, ISBN, disponible (boolean)
// - Farmacia: nombre, principioActivo, stock (number), precio (number)
// - Gimnasio: fullName, plan ('basic'|'premium'|'vip'), expiresAt (date)
// - Restaurante: nombre, descripción, precio (number), categoría
// ============================================

// TODO: Define el schema de creación para tu recurso
// Ejemplo mínimo (adáptalo a tu dominio):
export const createResourceSchema = z.object({
  // TODO: Reemplaza estos campos por los de tu recurso real
  // name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  // description: z.string().optional(),
  // price: z.number().positive('El precio debe ser mayor a 0'),
  // active: z.boolean().default(true),
});

// TODO: Define el schema de actualización (todos los campos opcionales)
// Usa .partial() para hacer todos los campos opcionales
export const updateResourceSchema = createResourceSchema.partial();

export type CreateResourceDto = z.infer<typeof createResourceSchema>;
export type UpdateResourceDto = z.infer<typeof updateResourceSchema>;
