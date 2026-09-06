import { z } from 'zod';
import { objectIdRegex, objectIdSchema } from './client.schema';
import { EVENT_CATEGORIES } from '../models/event.model';

export { objectIdSchema };

export const createEventSchema = z.object({
  name: z
    .string({ error: 'name debe ser un texto' })
    .trim()
    .min(1, { error: 'name no puede estar vacío' })
    .max(150, { error: 'name no puede exceder 150 caracteres' }),
  code: z
    .string({ error: 'code debe ser un texto' })
    .trim()
    .min(3, { error: 'code debe tener al menos 3 caracteres' })
    .max(30, { error: 'code no puede exceder 30 caracteres' })
    .regex(/^[A-Z0-9-]+$/i, { error: 'code solo puede contener letras, números y guiones' }),
  category: z.enum(EVENT_CATEGORIES, {
    error: `category no válida. Permitidas: ${EVENT_CATEGORIES.join(', ')}`,
  }),
  price: z
    .number({ error: 'price debe ser un número en COP' })
    .positive({ error: 'El presupuesto asignado (price) en COP debe ser mayor a 0' }),
  capacity: z
    .number({ error: 'capacity debe ser un número entero' })
    .int({ error: 'capacity debe ser un número entero' })
    .nonnegative({ error: 'El aforo no puede ser negativo' })
    .default(100),
  active: z.boolean({ error: 'active debe ser un booleano' }).default(true),
  location: z
    .string({ error: 'location debe ser un texto' })
    .trim()
    .min(1, { error: 'location es obligatoria' })
    .max(200, { error: 'location no puede exceder 200 caracteres' }),
  date: z
    .string({ error: 'date debe ser una cadena de texto en formato ISO o fecha válida' })
    .trim()
    .min(1, { error: 'date es obligatoria' })
    .refine((val) => !isNaN(Date.parse(val)), {
      error: 'date debe ser una fecha válida (formato ISO 8601 ej. 2026-03-27T14:00:00Z)',
    }),
  client: z
    .string({ error: 'client debe ser una cadena con el ObjectId del cliente' })
    .regex(objectIdRegex, { error: 'El campo client debe ser un ObjectId de MongoDB válido (24 caracteres hexadecimales)' }),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
