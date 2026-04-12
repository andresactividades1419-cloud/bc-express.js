import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';

export const app = express();
app.use(cors());
app.use(express.json());

// Health check — verifica la conexión a la base de datos
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected', uptime: process.uptime() });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected' });
  }
});

// ============================================================
// TODO: Adaptar las rutas al modelo de tu dominio
//
// Reemplaza "resources" con el nombre de tu entidad plural.
// Actualiza `prisma.resource` con el nombre de tu modelo.
//
// Mínimo requerido: GET (lista) y POST (crear)
// Opcional: GET por ID, PATCH, DELETE
// ============================================================
app.get('/api/v1/resources', async (_req, res, next) => {
  try {
    // TODO: Sustituir prisma.resource por tu modelo
    // const items = await prisma.book.findMany({ orderBy: { createdAt: 'desc' } });
    // res.json(items);
    res.json({ message: 'TODO: implementar listado de recursos' });
  } catch (err) { next(err); }
});

app.post('/api/v1/resources', async (req, res, next) => {
  try {
    // TODO: Validar con Zod y crear el recurso en la DB
    // const { name } = req.body as { name?: string };
    // if (!name) { res.status(400).json({ error: 'name required' }); return; }
    // const resource = await prisma.resource.create({ data: { name } });
    // res.status(201).json(resource);
    res.status(501).json({ message: 'TODO: implementar creación de recurso' });
  } catch (err) { next(err); }
});

// Error handler
app.use((_err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({ error: 'Internal server error' });
});
