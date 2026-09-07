import { z } from 'zod';
import { EVENT_CATEGORIES } from '../models/event.model.js';

export const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const objectIdSchema = z.object({
  id: z
    .string({ error: 'El ID debe ser una cadena de texto' })
    .regex(objectIdRegex, { error: 'El ID proporcionado no es un ObjectId de MongoDB valido' })
});

export const createEventSchema = z.object({
  name: z
    .string({ error: 'name debe ser un texto' })
    .trim()
    .min(2, { error: 'El nombre debe tener al menos 2 caracteres' })
    .max(150, { error: 'El nombre no puede exceder 150 caracteres' }),
  code: z
    .string({ error: 'code debe ser un texto' })
    .trim()
    .min(3, { error: 'El codigo debe tener al menos 3 caracteres' })
    .max(30, { error: 'El codigo no puede exceder 30 caracteres' })
    .regex(/^[A-Z0-9-]+$/i, { error: 'El codigo solo puede contener letras, numeros y guiones' }),
  category: z.enum(EVENT_CATEGORIES, {
    error: `Categoria no valida. Permitidas: ${EVENT_CATEGORIES.join(', ')}`,
  }),
  price: z
    .number({ error: 'price debe ser un numero en COP' })
    .positive({ error: 'El presupuesto en COP debe ser mayor a 0' }),
  capacity: z
    .number({ error: 'capacity debe ser un numero entero' })
    .int({ error: 'El aforo debe ser un numero entero' })
    .nonnegative({ error: 'El aforo no puede ser negativo' })
    .default(100),
  active: z.boolean({ error: 'active debe ser un booleano' }).default(true),
  location: z
    .string({ error: 'location debe ser un texto' })
    .trim()
    .min(1, { error: 'La locacion es obligatoria' })
    .max(200, { error: 'La locacion no puede exceder 200 caracteres' }),
  date: z
    .string({ error: 'date debe ser una cadena en formato de fecha valido' })
    .trim()
    .min(1, { error: 'La fecha es obligatoria' })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: 'La fecha debe ser valida (formato ISO 8601 ej. 2026-03-27T14:00:00Z)',
    }),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
