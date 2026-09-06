// ============================================
// ROUTES — Mapeo de URLs a controllers
// ============================================
// Las rutas solo conectan: URL + Método HTTP → función del controller
// No contienen lógica ni acceden a servicios directamente.

import { Router } from 'express';
import * as controller from '../controllers/events.controller';

export const eventsRouter = Router();

// Endpoints CRUD del dominio Productora de Eventos
eventsRouter.get('/', controller.getAll);
eventsRouter.get('/:id', controller.getById);
eventsRouter.post('/', controller.create);
eventsRouter.put('/:id', controller.update);
eventsRouter.delete('/:id', controller.remove);
