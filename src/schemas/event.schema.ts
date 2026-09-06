// ============================================
// SCHEMAS — Validación con Zod (Productora de Eventos)
// ============================================
import { z } from 'zod';

export const createEventSchema = z.object({
  name: z
    .string({ error: 'name es obligatorio' })
    .min(1, 'name no puede estar vacío')
    .trim(),
  category: z.enum(
    ['concierto', 'boda', 'conferencia', 'corporativo', 'festival', 'exposicion'] as const,
    {
      error: 'category no válida. Permitidas: concierto, boda, conferencia, corporativo, festival, exposicion',
    }
  ),
  price: z
    .number({ error: 'price es obligatorio' })
    .positive('El presupuesto asignado (price) en COP debe ser mayor a 0'),
  capacity: z
    .number()
    .int('El aforo (capacity) debe ser un número entero')
    .nonnegative('El aforo no puede ser negativo')
    .default(100),
  active: z.boolean().default(true),
  location: z
    .string({ error: 'location es obligatoria' })
    .min(1, 'location no puede estar vacía')
    .trim(),
  date: z
    .string({ error: 'date es obligatoria' })
    .min(1, 'date no puede estar vacía'),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
