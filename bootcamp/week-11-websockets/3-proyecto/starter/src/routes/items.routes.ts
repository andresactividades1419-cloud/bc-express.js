import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getAll, getById, create, remove } from '../controllers/items.controller';

// ============================================================
// TODO: Registrar los endpoints de ítems con sus middlewares.
//
// Rutas a implementar:
//   GET    /        → Listar todos los ítems (público o protegido, tú decides)
//   GET    /:id     → Obtener ítem por ID
//   POST   /        → Crear ítem (requiere auth)
//   DELETE /:id     → Eliminar ítem (requiere auth, solo el propietario)
// ============================================================

export const itemsRouter = Router();

// TODO: Descomentar las rutas
// itemsRouter.get('/', getAll);
// itemsRouter.get('/:id', getById);
// itemsRouter.post('/', authMiddleware, create);
// itemsRouter.delete('/:id', authMiddleware, remove);
