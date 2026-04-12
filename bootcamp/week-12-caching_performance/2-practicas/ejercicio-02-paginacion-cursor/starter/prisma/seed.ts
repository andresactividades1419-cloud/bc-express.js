import { PrismaClient } from '@prisma/client';

// Seed: inserta 50 artículos de ejemplo
const prisma = new PrismaClient();

const authors = ['Ana García', 'Carlos López', 'María Martínez', 'Juan Pérez', 'Laura Sánchez'];
const topics = ['Node.js', 'TypeScript', 'Express', 'Redis', 'PostgreSQL', 'REST APIs', 'Testing', 'Docker'];

async function main() {
  console.log('🌱 Seeding database...');

  // Limpiar tabla
  await prisma.article.deleteMany();

  // Crear 50 artículos
  const data = Array.from({ length: 50 }, (_, i) => ({
    title: `${topics[i % topics.length]} — Guía ${i + 1}`,
    excerpt: `Aprende todo sobre ${topics[i % topics.length]} en esta guía completa para desarrolladores backend.`,
    author: authors[i % authors.length],
    published: true,
    views: Math.floor(Math.random() * 1000),
    createdAt: new Date(Date.now() - i * 3600000), // cada artículo 1h más antiguo
  }));

  await prisma.article.createMany({ data });
  console.log(`✅ ${data.length} artículos creados`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
