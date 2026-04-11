# Semana 05 — PostgreSQL + Prisma ORM

## 🎯 Objetivos de la Semana

Al finalizar esta semana, serás capaz de:

- Entender el modelo relacional de PostgreSQL: tablas, columnas, tipos, llaves primarias y foráneas
- Configurar **Prisma ORM** en un proyecto Express con TypeScript
- Definir modelos en `schema.prisma` con tipos de datos, relaciones y validaciones
- Crear y ejecutar **migraciones** de base de datos con `prisma migrate dev`
- Implementar operaciones CRUD completas usando el **Prisma Client**
- Realizar consultas con filtros, paginación y ordenamiento
- Modelar **relaciones uno-a-muchos y muchos-a-muchos** usando `@relation`
- Integrar Prisma con la arquitectura en capas de semanas anteriores

## 📋 Prerrequisitos

- Semanas 01–04 completadas
- Arquitectura en 4 capas (`routes → controllers → services → repositories`)
- `AppError` y `errorHandler` de semana 04
- Docker instalado localmente (para correr PostgreSQL)
- Variables de entorno (`.env`) manejadas con `dotenv`

## 🗂️ Estructura de la Semana

```
week-05-postgresql_prisma/
├── 0-assets/
│   ├── 01-prisma-architecture.svg    # Capa Prisma Client entre app y DB
│   ├── 02-migration-flow.svg         # Flujo: schema.prisma → migrate → DB
│   └── 03-prisma-relations.svg       # Diagrama entidad-relación en Prisma
├── 1-teoria/
│   ├── 01-postgresql-fundamentos.md  # Modelo relacional, SQL, tablas, FK
│   ├── 02-prisma-schema.md           # Setup Prisma, schema.prisma, modelos
│   ├── 03-prisma-crud.md             # Prisma Client, CRUD, filtros, paginación
│   └── 04-prisma-relaciones.md       # Relations, include, select, N+1
├── 2-practicas/
│   ├── ejercicio-01-prisma-setup/    # Instalar Prisma, primer schema y migración
│   └── ejercicio-02-relaciones/      # Añadir relaciones e include a la API
├── 3-proyecto/
│   └── starter/                      # API con Prisma + AppError adaptable al dominio
└── 5-glosario/
    └── README.md
```

## 📝 Contenidos

### Teoría

| Archivo | Tema | Duración estimada |
|---------|------|:-----------------:|
| [01-postgresql-fundamentos.md](1-teoria/01-postgresql-fundamentos.md) | Modelo relacional, tablas, FK, SQL básico | 30 min |
| [02-prisma-schema.md](1-teoria/02-prisma-schema.md) | Setup Prisma, schema.prisma, modelos, migración init | 40 min |
| [03-prisma-crud.md](1-teoria/03-prisma-crud.md) | Prisma Client, findMany, create, update, delete, paginación | 35 min |
| [04-prisma-relaciones.md](1-teoria/04-prisma-relaciones.md) | @relation, include, select, problema N+1 | 30 min |

### Prácticas

| Ejercicio | Concepto | Duración estimada |
|-----------|----------|:-----------------:|
| [ejercicio-01-prisma-setup](2-practicas/ejercicio-01-prisma-setup/) | Configurar Prisma, definir modelo, migrar y hacer CRUD | 75 min |
| [ejercicio-02-relaciones](2-practicas/ejercicio-02-relaciones/) | Agregar segunda entidad con relación y usar `include` | 60 min |

### Proyecto

[3-proyecto/README.md](3-proyecto/README.md) — API CRUD completa con Prisma + PostgreSQL, arquitectura en capas, AppError para manejo de errores Prisma (`P2025 Not Found`, `P2002 Unique constraint`), paginación y relaciones opcionales.

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|-------:|
| Teoría (4 archivos) | 2 h 15 min |
| Ejercicio 01 — Prisma setup + CRUD | 1 h 15 min |
| Ejercicio 02 — Relaciones + include | 1 h |
| Proyecto semanal | 2 h 30 min |
| Revisión y corrección | 1 h |
| **Total** | **8 h** |

## 📌 Entregables

1. ✅ Ejercicio 01: API con Prisma Client conectada a PostgreSQL, migraciones ejecutadas, seed con datos
2. ✅ Ejercicio 02: Relación `@relation` definida, consultas con `include` funcionando
3. ✅ Proyecto adaptado a tu dominio con Prisma + AppError + manejo de P2002/P2025
4. ✅ Screenshots de Postman/Thunder Client con operaciones CRUD y errores controlados

## 🔗 Navegación

← [Semana 04 — Validación y Manejo de Errores](../week-04-validacion_error_handling/README.md) | [Semana 06 — MongoDB + Mongoose](../week-06-mongodb_mongoose/README.md) →
