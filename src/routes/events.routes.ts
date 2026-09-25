import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  listEventsHandler,
  getEventHandler,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
} from '../controllers/events.controller.js';

export const eventsRouter = Router();

eventsRouter.get('/', listEventsHandler);
eventsRouter.get('/:id', getEventHandler);
eventsRouter.post('/', authenticate, createEventHandler);
eventsRouter.patch('/:id', authenticate, updateEventHandler);
eventsRouter.delete('/:id', authenticate, deleteEventHandler);
