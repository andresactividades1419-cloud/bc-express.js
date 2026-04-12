import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/v1/auth/register`);
  console.log(`  POST /api/v1/auth/login`);
  console.log(`  GET  /api/v1/items              (cursor pagination + caché)`);
  console.log(`  GET  /api/v1/items/:id          (detail + caché)`);
  console.log(`  POST /api/v1/items              (auth requerida)`);
  console.log(`  PUT  /api/v1/items/:id          (auth requerida)`);
  console.log(`  DELETE /api/v1/items/:id        (auth requerida)`);
  console.log(`  GET  /health`);
});
