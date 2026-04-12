import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';

export const app = express();

app.use(cors());
app.use(express.json());

// ── Health check ─────────────────────────────────────────────────
// TODO 4: Completar el health check con verificación de DB
app.get('/health', async (_req: Request, res: Response) => {
  // TODO: await prisma.$queryRaw`SELECT 1` y capturar error
  // TODO: retornar { status: 'ok', db: 'connected', uptime, timestamp }
  // TODO: retornar 503 si la DB no responde
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── TODO 1: Adaptar rutas a tu dominio ───────────────────────────
// Ejemplo de estructura (reemplaza Resource con tu entidad):
//
// GET  /api/v1/resources          → listar con paginación
// GET  /api/v1/resources/:id      → obtener por id (404 si no existe)
// POST /api/v1/resources          → crear (validar con Zod)
// PUT  /api/v1/resources/:id      → actualizar
// DELETE /api/v1/resources/:id    → eliminar

// Error handler global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

export default app;
