// src/lib/prisma.ts — Singleton de PrismaClient
// Evita múltiples instancias de PrismaClient en desarrollo con hot-reload
// Ver: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management

import { PrismaClient } from '@prisma/client';

// En desarrollo, el process global persiste entre recargas de tsx watch.
// Sin este patrón, cada recarga crearía una nueva conexión y agotaría el pool.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'warn', 'error'],
  });

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}
