import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Iniciando seed de datos para Productora de Eventos...');

  // 1. Limpieza de datos previa para garantizar idempotencia
  await prisma.event.deleteMany();
  await prisma.client.deleteMany();

  // 2. Creacion de clientes corporativos (recurso secundario)
  const client1 = await prisma.client.create({
    data: {
      name: 'Páramo Presenta SAS',
      email: 'contacto@paramopresenta.com.co',
      phone: '+57 310 456 7890',
      company: 'Páramo Producciones',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Secretaría de Cultura de Bogotá',
      email: 'cultura@alcaldiabogota.gov.co',
      phone: '+57 601 327 4850',
      company: 'Alcaldía Mayor de Bogotá',
    },
  });

  const client3 = await prisma.client.create({
    data: {
      name: 'Grupo Bancolombia',
      email: 'eventos@bancolombia.com.co',
      phone: '+57 604 404 1000',
      company: 'Bancolombia SA',
    },
  });

  console.log('Clientes creados exitosamente: 3');

  // 3. Creacion de eventos (recurso principal con presupuesto en COP y relacion 1:N)
  const events = await prisma.event.createMany({
    data: [
      {
        name: 'Festival Estéreo Picnic 2026',
        code: 'EVT-2026-001',
        category: 'festival',
        price: 185000000,
        capacity: 45000,
        active: true,
        location: 'Parque Simón Bolívar, Bogotá',
        date: new Date('2026-03-27T14:00:00.000Z'),
        clientId: client1.id,
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
        clientId: client2.id,
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
        clientId: client3.id,
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
        clientId: client3.id,
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
        clientId: client2.id,
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
        clientId: client1.id,
      },
    ],
  });

  console.log(`Eventos creados exitosamente: ${events.count}`);
}

main()
  .catch((err: unknown) => {
    console.error('Error al ejecutar seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
