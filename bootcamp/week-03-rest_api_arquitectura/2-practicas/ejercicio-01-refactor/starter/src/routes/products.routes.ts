// ============================================
// ROUTES — Paso 4: mapeo de rutas
// ============================================
// Las rutas solo conectan URLs con controllers.
// No deben contener nada de lógica.
//
// Descomenta el bloque "PASO 4" cuando llegues a este paso.

import { Router } from 'express';

export const productsRouter = Router();

// ============================================
// PASO 4: Descomenta todo el bloque siguiente
// ============================================
// import * as controller from '../controllers/products.controller';
//
// productsRouter.get('/', controller.getAll);
// productsRouter.get('/:id', controller.getById);
// productsRouter.post('/', controller.create);
// productsRouter.put('/:id', controller.update);
// productsRouter.delete('/:id', controller.remove);
