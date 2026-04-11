// src/lib/prisma.ts — Singleton de PrismaClient
// ============================================================
// TODO: Implementar el singleton de PrismaClient
//
// Lineamientos:
//   - Usar el patrón globalForPrisma para evitar múltiples instancias
//   - Añadir log: ['query', 'warn', 'error'] en desarrollo
//   - Exportar `prisma` como named export
//
// Código base:
//
// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = global as unknown as { prisma: PrismaClient };
//
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({ log: ['query', 'warn', 'error'] });
//
// if (process.env['NODE_ENV'] !== 'production') {
//   globalForPrisma.prisma = prisma;
// }
// ============================================================
