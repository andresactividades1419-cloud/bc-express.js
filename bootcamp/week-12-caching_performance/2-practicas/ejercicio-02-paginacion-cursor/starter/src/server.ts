import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET /api/v1/articles?limit=5              (cursor, primera página)`);
  console.log(`  GET /api/v1/articles?cursor=ID&limit=5    (cursor, página siguiente)`);
  console.log(`  GET /api/v1/articles/offset?page=1&limit=5 (offset, para comparar)`);
  console.log(`  GET /health`);
});
