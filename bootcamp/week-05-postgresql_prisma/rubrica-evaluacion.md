# Rúbrica de Evaluación — Semana 05: PostgreSQL + Prisma ORM

## 📊 Distribución de Evidencias

| Evidencia | Porcentaje |
|-----------|----------:|
| 🧠 Conocimiento (quiz) | 30% |
| 💪 Desempeño (ejercicios) | 40% |
| 📦 Producto (proyecto) | 30% |

**Puntaje mínimo de aprobación por evidencia: 70%**

---

## 🧠 Conocimiento — Quiz (30%)

10 preguntas de opción múltiple o respuesta corta.

| # | Pregunta | Puntos |
|---|----------|-------:|
| 1 | ¿Qué hace `prisma migrate dev --name init`? | 10 |
| 2 | ¿Cuál es la diferencia entre `findUnique` y `findFirst`? | 10 |
| 3 | ¿Qué error Prisma lanza cuando un `unique` constraint falla? | 10 |
| 4 | ¿Cómo se define una relación 1:N en `schema.prisma`? | 10 |
| 5 | ¿Para qué sirve `include` en una query Prisma? | 10 |
| 6 | ¿Qué hace el Prisma Client singleton y por qué es necesario? | 10 |
| 7 | ¿Cómo se implementa paginación con `skip` y `take`? | 10 |
| 8 | ¿Qué es una migración y por qué no se deben editar manualmente? | 10 |
| 9 | ¿Qué archivo define la estructura de la base de datos en Prisma? | 10 |
| 10 | ¿Qué error Prisma lanza cuando no encuentra un registro en operaciones `update` o `delete`? | 10 |

**Total quiz: 100 puntos**

---

## 💪 Desempeño — Ejercicios (40%)

### Ejercicio 01 — Prisma Setup (20 puntos)

| Criterio | Puntos |
|----------|-------:|
| Prisma instalado correctamente y `schema.prisma` válido | 3 |
| Modelo con al menos 5 campos tipados correctamente | 3 |
| Migración ejecutada sin errores (`prisma/migrations/` existe) | 3 |
| Seed con datos iniciales funciona (`pnpm dlx prisma db seed`) | 3 |
| `findMany` con paginación `skip`/`take` funciona | 2 |
| `findUnique` retorna 404 con AppError cuando no existe | 2 |
| `create` valida con Zod antes de llamar Prisma | 2 |
| Error P2002 capturado y convertido en AppError 409 | 2 |

### Ejercicio 02 — Relaciones (20 puntos)

| Criterio | Puntos |
|----------|-------:|
| Segunda entidad definida en `schema.prisma` con `@relation` | 4 |
| Migración de la relación ejecutada correctamente | 3 |
| Endpoint que retorna entidad con sus relaciones (`include`) | 4 |
| Consulta sin N+1 (datos cargados en una sola query con `include`) | 3 |
| Error P2025 capturado al usar `include` con id inexistente | 3 |
| README con diagrama o descripción de la relación | 3 |

---

## 📦 Producto — Proyecto Semanal (30%)

### Criterios de Evaluación (100 puntos)

| Criterio | Puntos |
|----------|-------:|
| Schema Prisma coherente con el dominio (≥ 1 modelo, ≥ 5 campos) | 12 |
| Migración ejecutada y `prisma/migrations/` en el repo | 8 |
| Singleton de Prisma Client en `src/lib/prisma.ts` | 5 |
| Repositorio usa Prisma Client (no arrays en memoria) | 15 |
| Paginación con `skip`/`take` en endpoint de listado | 8 |
| P2025 capturado y convertido en AppError(404, ...) | 8 |
| P2002 capturado y convertido en AppError(409, ...) | 8 |
| `AppError` + `errorHandler` de semana 04 integrados | 8 |
| Tipos TypeScript derivados de Prisma Client (no duplicar interfaces) | 6 |
| Seed con al menos 5 registros coherentes con el dominio | 5 |
| Dominio coherente y original (implementación adaptada) | 10 |
| README con instrucciones de instalación y ejecución | 7 |

**Total proyecto: 100 puntos**

---

## ⛔ Penalizaciones

| Violación | Penalización |
|-----------|-------------:|
| `DATABASE_URL` hardcodeada en código fuente | -25 pts |
| Arrays en memoria en lugar de Prisma Client en el proyecto | -20 pts |
| `prisma/migrations/` no commiteadas | -10 pts |
| Sin manejo de P2025 (errores Prisma no controlados) | -15 pts |
| `new PrismaClient()` en cada request (sin singleton) | -10 pts |
| Interfaces TypeScript que duplican tipos de Prisma (redundantes) | -5 pts |
