import { Request, Response, NextFunction } from 'express';
import { redis } from '../lib/redis';

export interface CacheOptions {
  ttl?: number;
  keyFn?: (req: Request) => string;
}

// ============================================================
// TODO: Implementar middleware de caché HTTP (cache-aside)
// ============================================================
// Requisitos:
//   1. Solo cachear respuestas de métodos GET
//   2. Generar una clave de caché a partir de la ruta + query params
//   3. Si existe en Redis: retornar con X-Cache: HIT
//   4. Si no existe: continuar al controller, interceptar res.json,
//      guardar el body en Redis con TTL, y retornar con X-Cache: MISS
//   5. Si Redis falla: continuar sin caché (degradado gracioso)
//
// Pistas:
//   - redis.get(key) -> string | null
//   - redis.set(key, value, 'EX', ttl) para guardar con TTL en segundos
//   - Interceptar res.json = (body) => { ... ; return originalJson(body); }
//
// Referencia: 1-teoria/02-cache-express.md

export function cacheMiddleware(options: CacheOptions = {}) {
  const { ttl = 60, keyFn } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') return next();

    const key = keyFn
      ? keyFn(req)
      : `cache:${req.path}:${JSON.stringify(req.query)}`;

    try {
      // TODO: Leer desde caché
      // TODO: Si HIT → res.json(JSON.parse(cached)) con X-Cache: HIT
      // TODO: Si MISS → interceptar res.json, guardar con TTL, X-Cache: MISS

      next();
    } catch (err) {
      console.error('Cache middleware error:', (err as Error).message);
      next();
    }
  };
}

// Helper para invalidar claves por patrón glob
export async function invalidateCachePattern(pattern: string): Promise<void> {
  // TODO: Usar redis.keys(pattern) + redis.unlink(...keys)
  const keys = await redis.keys(pattern);
  if (keys.length) await redis.unlink(...keys);
}
