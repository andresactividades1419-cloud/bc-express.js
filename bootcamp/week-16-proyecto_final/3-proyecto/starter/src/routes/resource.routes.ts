import { Router } from 'express';
import * as resourceController from '../controllers/resource.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { createResourceSchema, updateResourceSchema } from '../validators/resource.schema';

// ============================================================
// TODO 6: Adaptar rutas al dominio asignado
// ============================================================
// Cambia el prefijo en routes/index.ts a tu entidad.
// Ejemplo: /books, /medicines, /members
// Ajusta los roles según las reglas de tu dominio:
//   - ¿Cualquier usuario autenticado puede crear?
//   - ¿Solo ADMIN puede eliminar?
// ============================================================

export const resourceRouter = Router();

// GET /api/v1/resources — public or authenticated? Decide for your domain
resourceRouter.get('/', resourceController.getAll);

// GET /api/v1/resources/:id
resourceRouter.get('/:id', resourceController.getById);

// POST /api/v1/resources — authenticated users
resourceRouter.post(
  '/',
  authenticate,
  validate(createResourceSchema),
  resourceController.create,
);

// PATCH /api/v1/resources/:id — authenticated users
resourceRouter.patch(
  '/:id',
  authenticate,
  validate(updateResourceSchema),
  resourceController.update,
);

// DELETE /api/v1/resources/:id — ADMIN only
resourceRouter.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  resourceController.remove,
);
