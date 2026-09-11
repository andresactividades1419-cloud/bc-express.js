import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { connectDB, disconnectDB } from './lib/mongoose.js';
import { UserModel } from './models/user.model.js';
import { EventModel } from './models/event.model.js';
import { logger } from './config/logger.js';

async function seed(): Promise<void> {
  try {
    await connectDB();
    logger.info('Iniciando proceso de inicializacion de datos...');

    await EventModel.deleteMany({});
    await UserModel.deleteMany({});

    const hashedPassword = await bcrypt.hash('Password123!', 10);

    const adminUser = await UserModel.create({
      name: 'Coordinador Principal',
      email: 'admin@productora.com',
      password: hashedPassword,
      role: 'admin'
    });

    const standardUser = await UserModel.create({
      name: 'Productor Logistico',
      email: 'productor@productora.com',
      password: hashedPassword,
      role: 'producer'
    });

    logger.info(`Usuarios creados: ${adminUser.email}, ${standardUser.email}`);

    const sampleEvents = [
      {
        name: 'Festival Musical del Cafe 2026',
        code: 'EVT-2026-101',
        category: 'festival',
        price: 85000000,
        capacity: 2500,
        active: true,
        location: 'Parque Metropolitano, Armenia, Quindio',
        date: new Date('2026-11-20T14:00:00.000Z'),
        createdBy: adminUser._id
      },
      {
        name: 'Convencion Nacional de Tecnologia',
        code: 'EVT-2026-102',
        category: 'conferencia',
        price: 45000000,
        capacity: 600,
        active: true,
        location: 'Centro de Convenciones Agora, Bogota D.C.',
        date: new Date('2026-10-15T08:00:00.000Z'),
        createdBy: adminUser._id
      },
      {
        name: 'Gala Anual de Fin de Ano',
        code: 'EVT-2026-103',
        category: 'corporativo',
        price: 32000000,
        capacity: 300,
        active: true,
        location: 'Hotel Dann Carlton, Medellin, Antioquia',
        date: new Date('2026-12-18T19:00:00.000Z'),
        createdBy: standardUser._id
      }
    ];

    await EventModel.insertMany(sampleEvents);
    logger.info(`Se insertaron ${sampleEvents.length} eventos iniciales.`);

    await disconnectDB();
    logger.info('Proceso de seed finalizado exitosamente.');
    process.exit(0);
  } catch (error) {
    logger.error('Error durante la ejecucion de seed:', error);
    process.exit(1);
  }
}

seed();
