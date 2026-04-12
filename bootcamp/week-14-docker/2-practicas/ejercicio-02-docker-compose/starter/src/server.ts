import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 API en http://localhost:${env.PORT}`);
  console.log(`   GET    /health`);
  console.log(`   GET    /api/v1/tasks`);
  console.log(`   POST   /api/v1/tasks`);
  console.log(`   PATCH  /api/v1/tasks/:id`);
  console.log(`   DELETE /api/v1/tasks/:id`);
});
