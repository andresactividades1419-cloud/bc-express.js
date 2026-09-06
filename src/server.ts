import { app } from './app';
import { logger } from './config/logger';
import { prisma } from './lib/prisma';

const PORT = Number(process.env['PORT']) || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API v1 events: http://localhost:${PORT}/api/v1/events`);
});

async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`Recibida señal ${signal}. Cerrando servidor y desconectando base de datos...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      logger.info('Conexión a Prisma cerrada correctamente.');
      process.exit(0);
    } catch (err: unknown) {
      logger.error('Error al desconectar Prisma durante shutdown:', { error: err });
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
