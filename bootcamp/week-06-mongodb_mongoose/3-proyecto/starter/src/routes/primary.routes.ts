// TODO: Renombrar el archivo y el router según tu dominio
// Ejemplos: books.routes.ts, medicines.routes.ts, members.routes.ts

import { Router } from 'express';
import * as ctrl from '../controllers/primary.controller';

const router = Router();

router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getById);
router.post('/',    ctrl.create);
router.put('/:id',  ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;
