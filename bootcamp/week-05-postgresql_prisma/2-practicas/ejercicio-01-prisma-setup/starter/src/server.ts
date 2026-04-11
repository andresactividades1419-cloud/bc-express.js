// src/server.ts — Entry point: inicia el servidor HTTP

import { app } from './app';

const PORT = Number(process.env['PORT']) || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});

// Graceful shutdown — cierra el servidor limpiamente ante señales del sistema
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
