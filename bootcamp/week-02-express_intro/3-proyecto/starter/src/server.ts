import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3000';
const app = createApp();

// TODO: Implementar graceful shutdown
// El servidor debe cerrarse limpiamente ante SIGTERM o SIGINT.
// Pistas:
// - const server = app.listen(...) guarda la referencia al servidor
// - process.on('SIGTERM', () => server.close(() => { ... }))
// - process.on('SIGINT', () => server.close(() => { ... }))

// Reemplaza esto con la implementación completa:
app.listen(Number(PORT), () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
