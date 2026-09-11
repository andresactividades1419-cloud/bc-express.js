import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = Router();

// Decision de diseno para Productora de Eventos:
// el catalogo de producciones es publico (cualquiera puede consultarlo,
// como el listado de una vitrina), pero crear/editar requiere sesion y
// eliminar requiere rol admin.
// IMPORTANTE: requireRole SIEMPRE despues de authMiddleware

// GET all — publico, cualquiera puede ver el catalogo de eventos
router.get('/', getEvents);

// GET by ID — publico, ficha de detalle del evento
router.get('/:id', getEventById);

// POST — crear evento requiere autenticacion
router.post('/', authMiddleware, createEvent);

// PATCH — actualizar: autenticado (el service verifica si es dueno o admin)
router.patch('/:id', authMiddleware, updateEvent);

// DELETE — eliminar: solo admin
router.delete('/:id', authMiddleware, requireRole('admin'), deleteEvent);

export default router;
