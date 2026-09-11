import { app } from './app.js';
import { eventStore } from './store.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

/**
 * Espera a que el catálogo de eventos termine de cargarse en memoria antes
 * de aceptar tráfico HTTP — evita la condición de carrera donde una petición
 * llega antes de que `data/events.json` haya sido leído.
 */
async function bootstrap(): Promise<void> {
  await eventStore.ready;

  const server = app.listen(PORT, () => {
    console.log(`
🚀 ========================================================
🎪 PRODUCTORA DE EVENTOS — SERVIDOR EXPRESS HTTP (Semana 02)
===========================================================
📡 Servidor escuchando en: http://localhost:${PORT}
🔗 Endpoint Base de Eventos: http://localhost:${PORT}/api/v1/events
🏥 Health Check:            http://localhost:${PORT}/health
===========================================================
    `);
  });

  /**
   * Manejo de Apagado Suave (Graceful Shutdown)
   */
  const handleShutdown = (signal: string) => {
    console.log(`\n🛑 Recibida señal ${signal}. Cerrando servidor HTTP de Productora de Eventos limpiamente...`);

    server.close(() => {
      console.log('✅ Servidor HTTP cerrado correctamente. Conexiones liberadas.');
      process.exit(0);
    });

    // Forzar apagado en 10 segundos si alguna conexión se queda colgada
    setTimeout(() => {
      console.error('⚠️ Apagado forzado por tiempo de espera excedido (10s).');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

bootstrap();
