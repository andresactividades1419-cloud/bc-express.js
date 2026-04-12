import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { itemsStore, usersStore } from '../data/store';
import { env } from '../config/env';

// ── Auth ────────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function login(req: Request, res: Response): void {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Email y password requeridos' });
    return;
  }
  const user = usersStore.findByEmail(result.data.email);
  if (!user || user.password !== result.data.password) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }
  const token = jwt.sign({ id: user.id, email: user.email }, env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token });
}

// ── Items ────────────────────────────────────────────────────────────────────

const createSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).default(0),
});

export function getAll(_req: Request, res: Response): void {
  res.json(itemsStore.findAll());
}

export function getById(req: Request, res: Response): void {
  const item = itemsStore.findById(req.params.id);
  if (!item) { res.status(404).json({ error: 'Item not found' }); return; }
  res.json(item);
}

export function create(req: Request, res: Response): void {
  const result = createSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: 'Invalid input', issues: result.error.flatten().fieldErrors });
    return;
  }
  const item = itemsStore.create({ price: 0, ...result.data });
  res.status(201).json(item);
}

export function remove(req: Request, res: Response): void {
  const deleted = itemsStore.remove(req.params.id);
  if (!deleted) { res.status(404).json({ error: 'Item not found' }); return; }
  res.status(204).send();
}
