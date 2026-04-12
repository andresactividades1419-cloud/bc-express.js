import { Request, Response, NextFunction } from 'express';
import { redis } from '../lib/redis';

interface CacheOptions {
  ttl?: number;
  keyFn?: (req: Request) => string;
}

export function cacheMiddleware(options: CacheOptions = {}) {
  const { ttl = 60, keyFn } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') return next();

    const key = keyFn
      ? keyFn(req)
      : `cache:${req.path}:${JSON.stringify(req.query)}`;

    try {
      // ============================================================
      // PASO 2: Leer desde caché
      // ============================================================
      // Si la clave existe en Redis, retornar directamente.
      // Descomenta las siguientes líneas:

      // const cached = await redis.get(key);
      // if (cached) {
      //   res.setHeader('X-Cache', 'HIT');
      //   return res.json(JSON.parse(cached));
      // }
      // res.setHeader('X-Cache', 'MISS');

      // ============================================================
      // PASO 3: Interceptar res.json para guardar en caché
      // ============================================================
      // Reemplazamos res.json con una versión que guarda el body
      // en Redis antes de enviarlo al cliente.
      // Descomenta las siguientes líneas:

      // const originalJson = res.json.bind(res);
      // res.json = (body: unknown) => {
      //   // Guardar de forma no bloqueante (no esperamos el resultado)
      //   redis.set(key, JSON.stringify(body), 'EX', ttl).catch((err) => {
      //     console.error('Cache set error:', err.message);
      //   });
      //   return originalJson(body);
      // };

      next();
    } catch (err) {
      // Si Redis falla, continuar sin caché (degradado gracioso)
      console.error('Cache middleware error:', (err as Error).message);
      next();
    }
  };
}
