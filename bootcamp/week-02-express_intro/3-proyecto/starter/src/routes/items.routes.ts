import { Router } from 'express';
import * as store from '../store.js';
import type { CreateItemDto, UpdateItemDto } from '../types.js';

export const itemsRouter = Router();

// GET /items — Listar todos los recursos
// TODO: Implementar usando store.getAll()
// Status: 200
itemsRouter.get('/', (_req, res) => {
  // TODO: retornar todos los ítems
  res.json([]);
});

// GET /items/:id — Obtener recurso por ID
// TODO: Implementar usando store.getById(id)
// Status: 200 si existe | 404 si no existe
itemsRouter.get('/:id', (req, res) => {
  // TODO: obtener el ítem y manejar 404
  res.status(404).json({ error: 'Not implemented' });
});

// POST /items — Crear nuevo recurso
// TODO: Implementar usando store.create(dto)
// Status: 201 con el recurso creado
itemsRouter.post('/', (req, res) => {
  // TODO: crear el ítem y retornar 201
  res.status(501).json({ error: 'Not implemented' });
});

// PUT /items/:id — Actualizar recurso completo
// TODO: Implementar usando store.update(id, dto)
// Status: 200 con el recurso actualizado | 404 si no existe
itemsRouter.put('/:id', (req, res) => {
  // TODO: actualizar el ítem y manejar 404
  res.status(501).json({ error: 'Not implemented' });
});

// DELETE /items/:id — Eliminar recurso
// TODO: Implementar usando store.remove(id)
// Status: 204 sin body | 404 si no existe
itemsRouter.delete('/:id', (req, res) => {
  // TODO: eliminar el ítem, retornar 204 o 404
  res.status(501).json({ error: 'Not implemented' });
});
