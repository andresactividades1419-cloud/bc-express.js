// ============================================
// SEED — Insertar datos de prueba
// TODO: Adaptar nombres y datos a tu dominio
// ============================================
//
// REGLA IMPORTANTE: Insertar la entidad SECUNDARIA primero,
// luego la PRINCIPAL usando los _id de la secundaria.
//
// Ejemplo para Biblioteca:
//   Paso A: Insertar Authors → obtener _id
//   Paso B: Insertar Books con author: author._id

import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Secondary } from './models/secondary.model';
import { Primary } from './models/primary.model';

async function seed(): Promise<void> {
  await connectDB();

  // TODO: Limpiar colecciones (orden inverso: primary primero, luego secondary)
  await Primary.deleteMany({});
  await Secondary.deleteMany({});
  console.log('Collections cleared');

  // TODO: Paso A — Insertar entidades secundarias y capturar _id
  // Adapta los datos a tu dominio:
  const [item1, item2, item3] = await Secondary.insertMany([
    { name: 'Secundaria 1' },  // TODO: reemplazar con datos reales de tu dominio
    { name: 'Secundaria 2' },
    { name: 'Secundaria 3' },
  ]);
  console.log('Secondary entities inserted');

  // TODO: Paso B — Insertar entidades principales referenciando los _id
  // Adapta los campos y valores a tu dominio:
  await Primary.insertMany([
    {
      name: 'Principal 1',          // TODO: campo real de tu dominio
      secondary: item1._id,         // TODO: renombrar 'secondary' al campo real
      // price: 100,                // TODO: añadir campos de tu dominio
    },
    {
      name: 'Principal 2',
      secondary: item1._id,
    },
    {
      name: 'Principal 3',
      secondary: item2._id,
    },
    {
      name: 'Principal 4',
      secondary: item3._id,
    },
    {
      name: 'Principal 5',
      secondary: item2._id,
    },
  ]);
  console.log('Primary entities inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
