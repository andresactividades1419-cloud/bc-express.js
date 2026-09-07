import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import { connectDB, disconnectDB } from './lib/mongoose.js';
import { logger } from './config/logger.js';

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });

    const handleShutdown = async (signal: string) => {
      logger.info(`Senal ${signal} recibida. Cerrando servidor de forma ordenada...`);
      server.close(async () => {
        await disconnectDB();
        logger.info('Servidor y conexion a base de datos finalizados.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    logger.error('Error critico al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();
