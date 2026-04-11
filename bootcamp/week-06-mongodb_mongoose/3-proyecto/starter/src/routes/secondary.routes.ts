// TODO: Renombrar el archivo y el router según tu dominio
// Ejemplos: authors.routes.ts, suppliers.routes.ts, plans.routes.ts

import { Router } from 'express';
import * as ctrl from '../controllers/secondary.controller';

const router = Router();

// TODO: Mantener estas rutas, solo renombra el archivo si cambias el dominio
router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getById);
router.post('/',    ctrl.create);
router.put('/:id',  ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
