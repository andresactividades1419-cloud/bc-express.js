import { Router } from 'express';
import * as itemsController from '../controllers/items.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/',      itemsController.getAll);
router.get('/:id',   itemsController.getById);
router.post('/',     authenticate, itemsController.create);
router.put('/:id',   authenticate, itemsController.update);
router.delete('/:id', authenticate, itemsController.remove);

export { router as itemsRouter };
