import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { productStore } from '../data/products';
import { redis } from '../lib/redis';

const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  price: z.number().positive(),
  category: z.string().min(1),
});

// Helper para invalidar la caché del listado
async function invalidateListCache(): Promise<void> {
  const keys = await redis.keys('cache:/api/v1/products:*');
  if (keys.length) await redis.unlink(...keys);
}

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productStore.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productStore.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await productStore.create(data);

    // ============================================================
    // PASO 4: Invalidar caché al crear un nuevo producto
    // ============================================================
    // Al crear un producto, el listado cacheado ya no es correcto.
    // Hay que eliminar las claves del listado para que el próximo
    // GET reconstruya la caché con datos frescos.
    // Descomenta las siguientes líneas:

    // await invalidateListCache();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const deleted = await productStore.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    // ============================================================
    // PASO 4 (continuación): Invalidar caché al eliminar
    // ============================================================
    // Descomenta las siguientes líneas:

    // await invalidateListCache();
    // // También invalidar el detalle del producto eliminado
    // await redis.del(`cache:/api/v1/products/${req.params.id}:undefined`);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
