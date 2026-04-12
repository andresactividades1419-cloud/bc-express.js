import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  console.log(`📦 Redis URL: ${env.REDIS_URL}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET   /api/v1/products       (caché 30s)`);
  console.log(`  GET   /api/v1/products/:id   (caché 60s)`);
  console.log(`  POST  /api/v1/products       (invalida caché)`);
  console.log(`  DELETE /api/v1/products/:id  (invalida caché)`);
  console.log(`  GET   /health`);
});
