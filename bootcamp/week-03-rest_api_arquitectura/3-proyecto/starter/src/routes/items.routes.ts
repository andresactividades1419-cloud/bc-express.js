// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================
// Las rutas solo conectan: URL + Método HTTP → función del controller
// No deben contener lógica ni acceder a servicios directamente.

import { Router } from 'express';
import * as controller from '../controllers/items.controller';

export const itemsRouter = Router();

// TODO: Registrar los 5 endpoints del CRUD
// itemsRouter.get('/', controller.getAll);
// itemsRouter.get('/:id', controller.getById);
// itemsRouter.post('/', controller.create);
// itemsRouter.put('/:id', controller.update);
// itemsRouter.delete('/:id', controller.remove);
