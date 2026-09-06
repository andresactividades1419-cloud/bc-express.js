import 'dotenv/config';
import { app } from './app';
import { connectDB, disconnectDB } from './lib/mongoose';
import { logger } from './config/logger';

const PORT = Number(process.env['PORT']) || 3000;

async function startServer(): Promise<void> {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
      logger.info(`API v1 clients: http://localhost:${PORT}/api/v1/clients`);
      logger.info(`API v1 events: http://localhost:${PORT}/api/v1/events`);
    });

    async function gracefulShutdown(signal: string): Promise<void> {
      logger.info(`Recibida señal ${signal}. Cerrando servidor y desconectando MongoDB...`);
      server.close(async () => {
        try {
          await disconnectDB();
          logger.info('Desconexión de MongoDB completada.');
          process.exit(0);
        } catch (err: unknown) {
          logger.error('Error al desconectar de MongoDB durante shutdown:', { error: err });
          process.exit(1);
        }
      });
    }

    process.on('SIGTERM', () => {
      void gracefulShutdown('SIGTERM');
    });

    process.on('SIGINT', () => {
      void gracefulShutdown('SIGINT');
    });
  } catch (err: unknown) {
    logger.error('Fallo al inicializar el servidor:', { error: err });
    process.exit(1);
  }
}

void startServer();
