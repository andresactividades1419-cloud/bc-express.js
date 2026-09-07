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
        title: 'Festival Musical del Cafe 2026',
        description: 'Encuentro cultural y musical al aire libre en el Eje Cafetero',
        date: new Date('2026-11-20T14:00:00.000Z'),
        location: 'Parque Metropolitano, Armenia, Quindio',
        budgetCOP: 85000000,
        type: 'festival',
        status: 'confirmed',
        attendeesCount: 2500,
        createdBy: adminUser._id
      },
      {
        title: 'Convencion Nacional de Tecnologia',
        description: 'Conferencias magistrales y networking empresarial',
        date: new Date('2026-10-15T08:00:00.000Z'),
        location: 'Centro de Convenciones Agora, Bogota D.C.',
        budgetCOP: 45000000,
        type: 'corporate',
        status: 'in_progress',
        attendeesCount: 600,
        createdBy: adminUser._id
      },
      {
        title: 'Gala Anual de Fin de Ano',
        description: 'Cena de gala y premiacion empresarial para asociados',
        date: new Date('2026-12-18T19:00:00.000Z'),
        location: 'Hotel Dann Carlton, Medellin, Antioquia',
        budgetCOP: 32000000,
        type: 'social',
        status: 'planning',
        attendeesCount: 300,
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
