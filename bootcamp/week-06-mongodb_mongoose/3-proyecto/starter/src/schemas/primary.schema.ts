// ============================================
// SCHEMA ZOD: Entidad Principal (con ref a secundaria)
// TODO: Adaptar campos a tu dominio
// ============================================

import { z } from 'zod';

// ObjectId: 24 caracteres hexadecimales
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createPrimarySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(150),

  // TODO: Añadir campos de tu dominio
  // price:  z.number().min(0).optional(),
  // code:   z.string().max(50).optional(),
  // active: z.boolean().default(true),

  // TODO: Renombrar 'secondary' al nombre del campo de referencia de tu dominio
  // (ej. author, supplier, plan, category, doctor)
  secondary: z.string().regex(objectIdRegex, 'ID de referencia inválido'),
});

export const updatePrimarySchema = createPrimarySchema.partial();

export type CreatePrimaryDto = z.infer<typeof createPrimarySchema>;
export type UpdatePrimaryDto = z.infer<typeof updatePrimarySchema>;
