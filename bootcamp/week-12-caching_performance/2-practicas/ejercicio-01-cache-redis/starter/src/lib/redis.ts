// ============================================================
// PASO 1: Crear cliente Redis con ioredis
// ============================================================

// ioredis es el cliente más popular para Redis en Node.js.
// Admite reconexión automática, pipelining y cluster.

// Descomenta las siguientes líneas:

// import Redis from 'ioredis';
// import { env } from '../config/env';
//
// export const redis = new Redis(env.REDIS_URL, {
//   // Reintentar conexión con backoff exponencial (máx 2s)
//   maxRetriesPerRequest: 3,
//   retryStrategy: (times: number) => Math.min(times * 50, 2000),
//   // No conectar hasta el primer uso — evita errores en tests
//   lazyConnect: true,
// });
//
// redis.on('connect', () => console.log('✅ Redis conectado'));
// redis.on('error', (err) => console.error('❌ Redis error:', err.message));

// Mientras no descomentes, exporta un cliente mock para no romper imports:
export const redis = {
  get: async (_key: string) => null,
  set: async (..._args: unknown[]) => 'OK',
  del: async (..._keys: string[]) => 0,
  unlink: async (..._keys: string[]) => 0,
  keys: async (_pattern: string) => [] as string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (_event: string, _cb: any) => ({ redis: null }),
  status: 'wait',
} as unknown as import('ioredis').Redis;
