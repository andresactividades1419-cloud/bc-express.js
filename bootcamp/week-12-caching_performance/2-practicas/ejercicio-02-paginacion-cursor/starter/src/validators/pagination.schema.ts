import { z } from 'zod';

// ============================================================
// PASO 1: Definir schemas de paginación con Zod
// ============================================================
// Los query params llegan como strings — usar z.coerce.number()
// para convertirlos automáticamente.
// El cursor es opcional: la primera página no tiene cursor.
// Descomenta las siguientes líneas:

// export const cursorPaginationSchema = z.object({
//   cursor: z.string().optional(),
//   limit: z.coerce.number().int().min(1).max(100).default(20),
// });

// export const offsetPaginationSchema = z.object({
//   page: z.coerce.number().int().positive().default(1),
//   limit: z.coerce.number().int().min(1).max(100).default(20),
// });

// export type CursorPaginationQuery = z.infer<typeof cursorPaginationSchema>;
// export type OffsetPaginationQuery = z.infer<typeof offsetPaginationSchema>;

// Placeholder mientras no se descomentan los schemas reales:
export const cursorPaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().default(20),
});
export const offsetPaginationSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
});
export type CursorPaginationQuery = z.infer<typeof cursorPaginationSchema>;
export type OffsetPaginationQuery = z.infer<typeof offsetPaginationSchema>;
