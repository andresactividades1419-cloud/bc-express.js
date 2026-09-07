import { Router } from 'express';
import { eventsController } from '../controllers/events.controller.js';
import { validateBody, validateParams } from '../middlewares/validate.js';
import { createEventSchema, updateEventSchema, objectIdSchema } from '../schemas/event.schema.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const eventsRouter = Router();

// Todas las rutas de eventos requieren autenticacion
eventsRouter.use(authenticate);

eventsRouter.get('/', (req, res, next) => {
  eventsController.getAll(req, res, next);
});

eventsRouter.get('/:id', validateParams(objectIdSchema), (req, res, next) => {
  eventsController.getById(req, res, next);
});

eventsRouter.post('/', validateBody(createEventSchema), (req, res, next) => {
  eventsController.create(req, res, next);
});

eventsRouter.patch('/:id', validateParams(objectIdSchema), validateBody(updateEventSchema), (req, res, next) => {
  eventsController.update(req, res, next);
});

eventsRouter.delete('/:id', validateParams(objectIdSchema), (req, res, next) => {
  eventsController.delete(req, res, next);
});
