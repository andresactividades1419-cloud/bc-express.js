import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Client } from './models/client.model';
import { Event } from './models/event.model';
import { logger } from './config/logger';

async function seed(): Promise<void> {
  await connectDB();
  logger.info('Iniciando seed de datos para Productora de Eventos en MongoDB...');

  // 1. Limpieza ordenada de colecciones
  await Event.deleteMany({});
  await Client.deleteMany({});
  logger.info('Colecciones limpiadas correctamente');

  // 2. Inserción de entidades secundarias (Clients)
  const [client1, client2, client3] = await Client.insertMany([
    {
      name: 'Páramo Presenta SAS',
      email: 'contacto@paramopresenta.com.co',
      phone: '+57 310 456 7890',
      company: 'Páramo Producciones',
    },
    {
      name: 'Secretaría de Cultura de Bogotá',
      email: 'cultura@alcaldiabogota.gov.co',
      phone: '+57 601 327 4850',
      company: 'Alcaldía Mayor de Bogotá',
    },
    {
      name: 'Grupo Bancolombia',
      email: 'eventos@bancolombia.com.co',
      phone: '+57 604 404 1000',
      company: 'Bancolombia SA',
    },
  ]);
  logger.info('Clientes corporativos creados: 3');

  // 3. Inserción de entidades principales (Events) referenciando los _id
  const events = await Event.insertMany([
    {
      name: 'Festival Estéreo Picnic 2026',
      code: 'EVT-2026-001',
      category: 'festival',
      price: 185000000,
      capacity: 45000,
      active: true,
      location: 'Parque Simón Bolívar, Bogotá',
      date: new Date('2026-03-27T14:00:00.000Z'),
      client: client1._id,
    },
    {
      name: 'Concierto Filarmónica de Bogotá',
      code: 'EVT-2026-002',
      category: 'concierto',
      price: 65000000,
      capacity: 1500,
      active: true,
      location: 'Teatro Mayor Julio Mario Santo Domingo, Bogotá',
      date: new Date('2026-04-15T20:00:00.000Z'),
      client: client2._id,
    },
    {
      name: 'Cumbre de Innovación y Fintech 2026',
      code: 'EVT-2026-003',
      category: 'conferencia',
      price: 95000000,
      capacity: 1200,
      active: true,
      location: 'Centro de Convenciones Cartagena de Indias',
      date: new Date('2026-05-10T09:00:00.000Z'),
      client: client3._id,
    },
    {
      name: 'Gala Anual Empresarial Bancolombia',
      code: 'EVT-2026-004',
      category: 'corporativo',
      price: 120000000,
      capacity: 800,
      active: true,
      location: 'Plaza Mayor, Medellín',
      date: new Date('2026-06-20T19:00:00.000Z'),
      client: client3._id,
    },
    {
      name: 'Festival de Jazz en el Parque',
      code: 'EVT-2026-005',
      category: 'festival',
      price: 45000000,
      capacity: 8000,
      active: true,
      location: 'Parque El Virrey, Bogotá',
      date: new Date('2026-07-18T16:00:00.000Z'),
      client: client2._id,
    },
    {
      name: 'Feria de la Moda y Diseño Colombiano',
      code: 'EVT-2026-006',
      category: 'exposicion',
      price: 78000000,
      capacity: 5000,
      active: true,
      location: 'Corferias, Bogotá',
      date: new Date('2026-08-05T10:00:00.000Z'),
      client: client1._id,
    },
  ]);

  logger.info(`Eventos creados exitosamente: ${events.length}`);
  logger.info('Proceso de seed completado exitosamente.');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  logger.error('Error durante la ejecución del seed:', { error: err });
  process.exit(1);
});
