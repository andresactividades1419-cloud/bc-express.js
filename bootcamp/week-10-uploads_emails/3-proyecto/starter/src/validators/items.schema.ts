// src/validators/items.schema.ts
import { z } from 'zod';

export const createItemSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(200),
    description: z.string().max(1000).optional(),
  }),
});

export const updateItemSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).optional(),
    description: z.string().max(1000).optional(),
  }),
});

export type CreateItemInput = z.infer<typeof createItemSchema>['body'];
export type UpdateItemInput = z.infer<typeof updateItemSchema>['body'];
