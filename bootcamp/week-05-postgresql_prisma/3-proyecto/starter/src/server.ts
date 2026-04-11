// src/server.ts — Entry point del servidor
// ============================================================
// TODO: Usar logger.info en lugar de console.log para los mensajes de inicio
//
// Pasos:
//   1. Importar logger desde './config/logger'
//   2. Reemplazar console.log por logger.info en el callback de app.listen
//   3. Opcional: cerrar prisma.$disconnect() en el graceful shutdown
// ============================================================

import { app } from './app';

const PORT = Number(process.env['PORT']) || 3000;

const server = app.listen(PORT, () => {
  // TODO: reemplazar console.log con logger.info
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
