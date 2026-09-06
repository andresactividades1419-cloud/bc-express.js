import { z } from 'zod';

export const objectIdRegex = /^[0-9a-fA-F]{24}$/;
export const objectIdSchema = z
  .string({ error: 'El ID debe ser una cadena de texto' })
  .regex(objectIdRegex, { error: 'El ID proporcionado no es un ObjectId de MongoDB válido' });

export const createClientSchema = z.object({
  name: z
    .string({ error: 'name debe ser un texto' })
    .trim()
    .min(1, { error: 'name no puede estar vacío' })
    .max(120, { error: 'name no puede exceder 120 caracteres' }),
  email: z
    .string({ error: 'email debe ser un texto' })
    .trim()
    .email({ error: 'email debe ser una dirección de correo válida' }),
  phone: z
    .string({ error: 'phone debe ser un texto' })
    .trim()
    .min(7, { error: 'phone debe tener al menos 7 dígitos' })
    .max(25, { error: 'phone no puede exceder 25 caracteres' }),
  company: z.string({ error: 'company debe ser un texto' }).trim().optional(),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientDto = z.infer<typeof createClientSchema>;
export type UpdateClientDto = z.infer<typeof updateClientSchema>;
