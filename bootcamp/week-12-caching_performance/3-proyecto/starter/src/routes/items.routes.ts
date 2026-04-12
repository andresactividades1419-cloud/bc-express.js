import { Router } from 'express';
import * as itemsController from '../controllers/items.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = Router();

// GET /items — listado con cursor pagination + caché 30s
// TODO: Agregar cacheMiddleware({ ttl: 30 }) al listado
router.get('/', cacheMiddleware({ ttl: 30 }), itemsController.getAll);

// GET /items/:id — detalle con caché 60s
// TODO: Agregar cacheMiddleware({ ttl: 60, keyFn: (r) => `cache:item:${r.params.id}` })
router.get('/:id', cacheMiddleware({ ttl: 60, keyFn: (r) => `cache:item:${r.params.id}` }), itemsController.getById);

// Rutas protegidas — requieren JWT
router.post('/', authMiddleware, itemsController.create);
router.put('/:id', authMiddleware, itemsController.update);
router.delete('/:id', authMiddleware, itemsController.remove);

export { router as itemsRouter };
