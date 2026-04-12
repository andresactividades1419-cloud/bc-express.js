import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 API en http://localhost:${env.PORT}/api/v1`);
  console.log(`📖 Swagger UI: http://localhost:${env.PORT}/api-docs  (después del TODO)`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});
