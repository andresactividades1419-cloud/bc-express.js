import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string({ error: 'email debe ser un texto' })
    .trim()
    .email({ error: 'Email inválido' }),
  password: z
    .string({ error: 'password es requerida' })
    .min(8, { error: 'Mínimo 8 caracteres' })
    .regex(/[A-Z]/, { error: 'Debe contener al menos una mayúscula' })
    .regex(/[0-9]/, { error: 'Debe contener al menos un número' }),
  name: z
    .string({ error: 'name debe ser un texto' })
    .trim()
    .min(2, { error: 'El nombre debe tener al menos 2 caracteres' }),
  role: z.enum(['user', 'admin', 'producer']).optional().default('user'),
});

export const loginSchema = z.object({
  email: z
    .string({ error: 'email debe ser un texto' })
    .trim()
    .email({ error: 'Email inválido' }),
  password: z.string({ error: 'password es requerida' }).min(1, { error: 'La contraseña es requerida' }),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
