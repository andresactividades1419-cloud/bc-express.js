// ============================================================
// TODO: Conectar a Redis con ioredis
// ============================================================
// Guía:
//   1. Importar Redis from 'ioredis' y env from '../config/env'
//   2. Crear instancia con env.REDIS_URL y opciones de reconexión
//   3. Registrar listeners 'connect' y 'error'
//   4. Exportar 'redis'
//
// Referencia: 1-teoria/01-redis-fundamentos.md

import Redis from 'ioredis';
import { env } from '../config/env';

// TODO: Implementar conexión Redis
export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  lazyConnect: true,
});

redis.on('connect', () => console.log('✅ Redis conectado'));
redis.on('error', (err) => console.error('❌ Redis error:', err.message));
