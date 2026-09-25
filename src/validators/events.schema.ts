import { z } from 'zod';
import { EVENT_CATEGORIES } from '../models/event.model.js';

const categoryEnum = z.enum(EVENT_CATEGORIES as [string, ...string[]]) as unknown as z.ZodType<
  (typeof EVENT_CATEGORIES)[number]
>;

export const createEventSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    code: z.string().min(2).max(30),
    category: categoryEnum,
    price: z.number().nonnegative(),
    capacity: z.number().int().positive(),
    location: z.string().min(2),
    date: z.string().min(1),
  }),
});

export const updateEventSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    code: z.string().min(2).max(30).optional(),
    category: categoryEnum.optional(),
    price: z.number().nonnegative().optional(),
    capacity: z.number().int().positive().optional(),
    location: z.string().min(2).optional(),
    date: z.string().min(1).optional(),
  }),
});
