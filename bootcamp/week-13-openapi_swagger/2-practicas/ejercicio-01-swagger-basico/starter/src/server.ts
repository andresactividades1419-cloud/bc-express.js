import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET    /api/v1/products`);
  console.log(`  GET    /api/v1/products/:id`);
  console.log(`  POST   /api/v1/products`);
  console.log(`  DELETE /api/v1/products/:id`);
  console.log(`  GET    /api-docs          ← Swagger UI (después del PASO 2)`);
  console.log(`  GET    /api-docs.json     ← spec JSON  (después del PASO 2)`);
});
