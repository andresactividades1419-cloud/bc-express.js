// src/server.ts
import mongoose from 'mongoose';
import { app } from './app';
import { env } from './config/env';

async function bootstrap(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
  console.log('✅ MongoDB conectado');

  const server = app.listen(Number(env.PORT), () => {
    console.log(`🚀 Servidor en http://localhost:${env.PORT}`);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      mongoose.disconnect();
      console.log('Servidor cerrado.');
    });
  });
}

bootstrap().catch((err) => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});
