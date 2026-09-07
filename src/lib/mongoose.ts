import mongoose from 'mongoose';
import { logger } from '../config/logger';

export async function connectDB(): Promise<void> {
  const uri = process.env['MONGODB_URI'];
  if (!uri) {
    throw new Error('MONGODB_URI no está configurado en las variables de entorno');
  }

  await mongoose.connect(uri);
  logger.info('Conexión a MongoDB establecida exitosamente.');
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Conexión a MongoDB cerrada correctamente.');
}
