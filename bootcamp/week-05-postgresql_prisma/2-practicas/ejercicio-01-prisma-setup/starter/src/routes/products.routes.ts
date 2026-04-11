// src/routes/products.routes.ts — Definición de rutas del recurso Product

import { Router } from 'express';
import * as ctrl from '../controllers/products.controller';

const router = Router();

// GET  /api/v1/products?page=1&limit=10   → listado paginado
router.get('/', ctrl.getAll);

// GET  /api/v1/products/:id               → detalle por ID
router.get('/:id', ctrl.getById);

// POST /api/v1/products                   → crear nuevo
router.post('/', ctrl.create);

// PUT  /api/v1/products/:id               → actualizar
router.put('/:id', ctrl.update);

// DELETE /api/v1/products/:id             → eliminar
router.delete('/:id', ctrl.remove);

export default router;
