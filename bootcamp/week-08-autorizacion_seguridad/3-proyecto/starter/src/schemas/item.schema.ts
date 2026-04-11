import { z } from 'zod';

// ============================================
// TODO: Adapta este schema a tu dominio
// ============================================
// Agrega los campos específicos de tu recurso.
// Zod valida y sanitiza (previene XSS al rechazar HTML).

export const createItemSchema = z.object({
  body: z.object({
    // TODO: Reemplaza / agrega campos de tu dominio
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(200)
      .regex(/^[^<>]*$/, 'Name must not contain HTML characters'), // prevent XSS
    description: z
      .string()
      .max(1000)
      .regex(/^[^<>]*$/, 'Description must not contain HTML characters')
      .optional(),
    // TODO: Agrega campos específicos:
    // isbn: z.string().regex(/^\d{13}$/, 'ISBN must be 13 digits').optional(),
    // price: z.number().positive('Price must be positive').optional(),
  }),
});

export const updateItemSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2)
      .max(200)
      .regex(/^[^<>]*$/)
      .optional(),
    description: z
      .string()
      .max(1000)
      .regex(/^[^<>]*$/)
      .optional(),
    active: z.boolean().optional(),
    // TODO: Agrega campos actualizables de tu dominio
  }),
});

export type CreateItemDto = z.infer<typeof createItemSchema>['body'];
export type UpdateItemDto = z.infer<typeof updateItemSchema>['body'];
