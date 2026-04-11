// prisma/seed.ts — Datos iniciales del dominio
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // ============================================================
  // TODO: Implementar el seed de tu dominio
  //
  // Lineamientos:
  //   1. Limpiar datos existentes (deleteMany) para idempotencia
  //   2. Crear registros del recurso secundario primero (si tienes relación)
  //   3. Crear mínimo 5 registros del recurso principal
  //   4. Usar console.log para confirmar la cantidad creada
  //
  // Ejemplo — Biblioteca:
  //   await prisma.book.deleteMany();
  //   await prisma.author.deleteMany();
  //   const tolkien = await prisma.author.create({ data: { name: 'J.R.R. Tolkien', ... } });
  //   const result = await prisma.book.createMany({
  //     data: [
  //       { title: 'El Señor de los Anillos', isbn: 'ISBN-001', authorId: tolkien.id, ... },
  //       ...
  //     ],
  //   });
  //   console.log(`✅ ${result.count} libros creados`);
  // ============================================================
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
