import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
} from '../controllers/items.controller.js';

// ============================================================
// ITEMS ROUTER — adaptar la ruta base al dominio asignado
// ============================================================
// Ejemplos:
//   Biblioteca  → /api/v1/books
//   Farmacia    → /api/v1/medicines
//   Gimnasio    → /api/v1/members
// ============================================================

export const itemsRouter = Router();

itemsRouter.get('/',     getAllHandler);
itemsRouter.get('/:id',  getByIdHandler);
itemsRouter.post('/',    authenticate, createHandler);
itemsRouter.put('/:id',  authenticate, updateHandler);
itemsRouter.delete('/:id', authenticate, deleteHandler);
