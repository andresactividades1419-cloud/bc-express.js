import { z } from 'zod';
import { EVENT_CATEGORIES } from '../models/event.model.js';

// Zod valida y sanitiza: la regex /^[^<>]*$/ rechaza HTML (previene XSS)
// en los campos de texto libre, tal como exige la especificacion.

export const createEventSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(150, 'El nombre no puede exceder 150 caracteres')
      .regex(/^[^<>]*$/, 'El nombre no puede contener caracteres HTML'),
    code: z
      .string()
      .min(3, 'El codigo debe tener al menos 3 caracteres')
      .max(30, 'El codigo no puede exceder 30 caracteres')
      .regex(/^[A-Z0-9-]+$/i, 'El codigo solo puede contener letras, numeros y guiones'),
    category: z.enum(EVENT_CATEGORIES, {
      error: `Categoria no valida. Permitidas: ${EVENT_CATEGORIES.join(', ')}`,
    }),
    price: z.number().positive('El presupuesto en COP debe ser mayor a 0'),
    capacity: z.number().int().nonnegative('El aforo no puede ser negativo').default(100),
    active: z.boolean().default(true),
    location: z
      .string()
      .min(1, 'La locacion es obligatoria')
      .max(200, 'La locacion no puede exceder 200 caracteres')
      .regex(/^[^<>]*$/, 'La locacion no puede contener caracteres HTML'),
    date: z
      .string()
      .min(1, 'La fecha es obligatoria')
      .refine((val) => !isNaN(Date.parse(val)), 'La fecha debe ser valida (formato ISO 8601)'),
  }),
});

export const updateEventSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2)
      .max(150)
      .regex(/^[^<>]*$/)
      .optional(),
    code: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[A-Z0-9-]+$/i)
      .optional(),
    category: z.enum(EVENT_CATEGORIES).optional(),
    price: z.number().positive().optional(),
    capacity: z.number().int().nonnegative().optional(),
    active: z.boolean().optional(),
    location: z
      .string()
      .min(1)
      .max(200)
      .regex(/^[^<>]*$/)
      .optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'La fecha debe ser valida (formato ISO 8601)')
      .optional(),
  }),
});

export type CreateEventDto = z.infer<typeof createEventSchema>['body'];
export type UpdateEventDto = z.infer<typeof updateEventSchema>['body'];
