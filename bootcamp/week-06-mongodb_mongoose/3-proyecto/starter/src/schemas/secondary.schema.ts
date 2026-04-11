// ============================================
// SCHEMA ZOD: Entidad Secundaria
// TODO: Adaptar campos a tu dominio
// ============================================

import { z } from 'zod';

export const createSecondarySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  // TODO: Añadir campos de tu dominio
  // description: z.string().max(500).optional(),
  // phone: z.string().max(20).optional(),
});

export const updateSecondarySchema = createSecondarySchema.partial();

export type CreateSecondaryDto = z.infer<typeof createSecondarySchema>;
export type UpdateSecondaryDto = z.infer<typeof updateSecondarySchema>;
