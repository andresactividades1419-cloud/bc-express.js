import { env } from './config/env';
import { app } from './app';

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  console.log(`\n📖 Swagger UI: http://localhost:${env.PORT}/api-docs`);
  console.log(`   Spec JSON:   http://localhost:${env.PORT}/api-docs.json`);
  console.log(`\nCredenciales de prueba: admin@example.com / password123`);
});
