# Semana 06 — MongoDB y Mongoose ORM

## 🎯 Objetivos de Aprendizaje

Al finalizar esta semana, serás capaz de:

1. Comprender el modelo de datos NoSQL (documentos, colecciones, BSON)
2. Comparar cuándo usar MongoDB vs PostgreSQL según el caso de uso
3. Configurar MongoDB con Docker y conectar desde Node.js con Mongoose
4. Definir schemas con tipos, validadores, timestamps e índices en Mongoose
5. Implementar CRUD completo con manejo de errores específicos de MongoDB
6. Relacionar documentos usando referencias (`ObjectId`) y `populate()`

## 📋 Requisitos Previos

- Semanas 01–05 completadas
- Dominio de la arquitectura en capas (routes → controllers → services → repositories)
- Manejo de errores con AppError y middleware global (semana 04)
- Comprensión de bases de datos relacionales con Prisma (semana 05)
- Docker instalado (`docker --version`)

## 🗂️ Estructura de la Semana

```
week-06-mongodb_mongoose/
├── 1-teoria/
│   ├── 01-mongodb-fundamentos.md    # NoSQL, documentos, comparativa SQL
│   ├── 02-mongoose-schema.md        # Conexión, Schema, tipos, validadores
│   ├── 03-mongoose-crud.md          # CRUD, filtros, paginación, lean()
│   └── 04-mongoose-relaciones.md    # Embedding vs referencing, populate()
├── 2-practicas/
│   ├── ejercicio-01-mongoose-setup/ # CRUD básico con Mongoose
│   └── ejercicio-02-populate/       # Referencias y populate()
└── 3-proyecto/                      # API MongoDB adaptada al dominio propio
```

## 📝 Contenidos

### Teoría

| Archivo | Tema | Duración |
|---------|------|----------|
| [01-mongodb-fundamentos.md](1-teoria/01-mongodb-fundamentos.md) | NoSQL, documentos, colecciones, BSON, Docker, comparativa SQL vs MongoDB | 35 min |
| [02-mongoose-schema.md](1-teoria/02-mongoose-schema.md) | Conexión, Schema, SchemaTypes, validadores, índices, virtuals, middleware | 40 min |
| [03-mongoose-crud.md](1-teoria/03-mongoose-crud.md) | CRUD, filtros, paginación, lean(), proyecciones, manejo de errores | 35 min |
| [04-mongoose-relaciones.md](1-teoria/04-mongoose-relaciones.md) | Embedding vs referencing, populate(), ObjectId, agregaciones | 30 min |

### Prácticas

| Ejercicio | Descripción | Duración |
|-----------|-------------|----------|
| [ejercicio-01-mongoose-setup](2-practicas/ejercicio-01-mongoose-setup/) | API CRUD completa con Mongoose, schema, validadores y error handling | 70 min |
| [ejercicio-02-populate](2-practicas/ejercicio-02-populate/) | Añadir entidad Category con referencia y populate() | 50 min |

### Proyecto

| Entregable | Descripción |
|------------|-------------|
| [3-proyecto/](3-proyecto/) | Migrar la API del dominio asignado de arrays a MongoDB con Mongoose |

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|--------|
| Teoría (4 archivos) | 2h 20min |
| Ejercicio 01 | 1h 10min |
| Ejercicio 02 | 50min |
| Proyecto semanal | 2h 30min |
| Revisión y entrega | 1h 10min |

## 📌 Entregables

1. Ejercicio 01 funcionando: API CRUD conectada a MongoDB con Mongoose
2. Ejercicio 02 funcionando: Entidad secundaria con `populate()` en respuesta
3. Proyecto adaptado al dominio asignado con MongoDB
4. Screenshots de Thunder Client/Postman mostrando los 5 endpoints CRUD

## 🔗 Navegación

← [Semana 05 — PostgreSQL y Prisma ORM](../week-05-postgresql_prisma/README.md)

→ [Semana 07 — Autenticación con JWT](../week-07-autenticacion_jwt/README.md)
