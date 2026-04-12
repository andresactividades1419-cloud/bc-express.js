import { Router } from 'express';
import { cacheMiddleware } from '../middlewares/cache.middleware';
import * as productController from '../controllers/product.controller';

const router = Router();

// GET /api/v1/products — caché de 30 segundos
router.get('/', cacheMiddleware({ ttl: 30 }), productController.getAll);

// GET /api/v1/products/:id — caché de 60 segundos, clave con ID
router.get(
  '/:id',
  cacheMiddleware({
    ttl: 60,
    keyFn: (req) => `cache:/api/v1/products/${req.params.id}:undefined`,
  }),
  productController.getById,
);

// POST y DELETE no usan caché
router.post('/', productController.create);
router.delete('/:id', productController.remove);

export { router as productRouter };
