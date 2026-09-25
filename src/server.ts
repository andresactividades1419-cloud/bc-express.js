import mongoose from 'mongoose';
import { app } from './app.js';
import { env } from './config/env.js';

async function main(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
  app.listen(env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${env.PORT}`);
  });
}

main().catch((err) => {
  console.error('Error al iniciar el servidor', err);
  process.exit(1);
});
