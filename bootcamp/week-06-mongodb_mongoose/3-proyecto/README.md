# Proyecto Semana 06 — API REST con MongoDB + Mongoose

## 🎯 Objetivo

Construir una API REST completa usando Express 5, TypeScript, Mongoose y MongoDB. La API debe incluir al menos **dos entidades relacionadas** con `populate()`, paginación, manejo de errores 11000 y CastError, y un seed con datos de prueba.

---

## 📋 Tu Dominio Asignado

> **El instructor te asignará un dominio único al inicio del bootcamp.**

Adapta todos los nombres de entidades, campos y lógica de negocio al dominio que se te asignó. Ejemplos de adaptación:

| Dominio | Entidad Principal | Entidad Secundaria | Campo de Referencia |
|---------|------------------|--------------------|---------------------|
| 📖 Biblioteca | Book | Author | `author: ObjectId` |
| 💊 Farmacia | Medicine | Supplier | `supplier: ObjectId` |
| 🏋️ Gimnasio | Member | Plan | `plan: ObjectId` |
| 🍽️ Restaurante | Dish | Category | `category: ObjectId` |
| 🏥 Hospital | Patient | Doctor | `assignedDoctor: ObjectId` |
| 🎥 Cine | Movie | Genre | `genre: ObjectId` |
| 🏬 Tienda de mascotas | Pet | Species | `species: ObjectId` |
| ✈️ Agencia de viajes | Tour | Destination | `destination: ObjectId` |

---

## ✅ Requisitos Funcionales

### Entidades (adaptables a tu dominio)

**Entidad Secundaria** (sin referencias) — ejemplo: `Category`, `Author`, `Supplier`:
- `GET    /api/v1/[secundaria]`       — listar todas
- `GET    /api/v1/[secundaria]/:id`   — obtener por ID
- `POST   /api/v1/[secundaria]`       — crear
- `PUT    /api/v1/[secundaria]/:id`   — actualizar
- `DELETE /api/v1/[secundaria]/:id`   — eliminar

**Entidad Principal** (referencia a la secundaria) — ejemplo: `Product`, `Book`, `Member`:
- `GET    /api/v1/[principal]`        — listar con paginación + populate()
- `GET    /api/v1/[principal]/:id`    — obtener con populate()
- `POST   /api/v1/[principal]`        — crear (validar que el ID de la secundaria sea válido)
- `PUT    /api/v1/[principal]/:id`    — actualizar
- `DELETE /api/v1/[principal]/:id`    — eliminar

### Paginación

```
GET /api/v1/[principal]?page=1&limit=10
```

Respuesta:
```json
{
  "data": [...],
  "total": 25,
  "page": 1,
  "totalPages": 3
}
```

---

## 🛠️ Stack Técnico

```
Node.js 22   |   Express 5.1.0   |   TypeScript 5.8.3
Mongoose 9.4.1   |   MongoDB 7 (Docker)   |   Zod 4.3.6
```

---

## 📁 Estructura del Proyecto

```
starter/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── lib/
    │   └── mongoose.ts          ← connectDB (dado)
    ├── models/
    │   ├── [secondary].model.ts ← TODO: definir schema
    │   └── [primary].model.ts   ← TODO: definir schema con ref
    ├── errors/
    │   └── AppError.ts          (dado)
    ├── middlewares/
    │   ├── errorHandler.ts      (dado)
    │   └── notFound.ts          (dado)
    ├── schemas/
    │   ├── [secondary].schema.ts ← TODO: validación Zod
    │   └── [primary].schema.ts   ← TODO: validación Zod con ObjectId
    ├── repositories/
    │   ├── [secondary].repository.ts ← TODO: CRUD completo
    │   └── [primary].repository.ts   ← TODO: CRUD + populate + error handling
    ├── services/
    │   ├── [secondary].service.ts    ← TODO
    │   └── [primary].service.ts      ← TODO
    ├── controllers/
    │   ├── [secondary].controller.ts ← TODO
    │   └── [primary].controller.ts   ← TODO
    ├── routes/
    │   ├── [secondary].routes.ts     ← TODO
    │   └── [primary].routes.ts       ← TODO
    ├── app.ts                        ← TODO: montar ambos routers
    ├── server.ts                     (dado — connectDB antes de listen)
    └── seed.ts                       ← TODO: insertar secundaria primero
```

---

## 💡 Guía de Implementación

### 1. Definir los schemas de Mongoose

```ts
// TODO: Adaptar los campos a tu dominio
// Entidad secundaria (sin refs):
const secondarySchema = new Schema<ISecondary>({
  name: { type: String, required: true, unique: true, trim: true },
  // ... campos específicos de tu dominio
}, { timestamps: true });

// Entidad principal (con ref a secundaria):
const primarySchema = new Schema<IPrimary>({
  name: { type: String, required: true },
  // Campo de referencia — ADAPTAR el nombre:
  [secondary]: {
    type: Schema.Types.ObjectId,
    ref: '[SecondaryModelName]',
    required: true,
  },
  // ... campos específicos de tu dominio
}, { timestamps: true });
```

### 2. Validar en Zod

```ts
// El campo de referencia debe validarse como ObjectId (24 hex chars)
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createPrimarySchema = z.object({
  name: z.string().min(1).max(100),
  [secondary]: z.string().regex(objectIdRegex, 'ID inválido'),
  // ... más campos
});
```

### 3. Manejar errores en el repositorio

```ts
// Errores que DEBES manejar:
// 11000 (unique) → AppError(409)
// CastError      → AppError(400)
// null devuelto  → AppError(404)
```

### 4. Seed: insertar secundaria primero

```ts
// SIEMPRE limpiar e insertar en este orden:
await Primary.deleteMany({});
await Secondary.deleteMany({});

const [item1, item2] = await Secondary.insertMany([...]);
await Primary.insertMany([
  { ..., [secondary]: item1._id },
  { ..., [secondary]: item2._id },
]);
```

---

## 📌 Entregables

1. **API funcional** — todos los endpoints responden correctamente
2. **Código adaptado** — entidades con nombres y campos de tu dominio
3. **Populate funcionando** — `GET /[principal]` devuelve la entidad secundaria como objeto
4. **Errores manejados** — 400 (CastError), 404 (not found), 409 (duplicate)
5. **Seed ejecutable** — `pnpm seed` inserta datos sin errores
6. **README actualizado** — describe el dominio, entidades, campos y endpoints

### Evidencia

Incluye capturas de:
- `GET /[principal]` mostrando el campo populado
- `POST /[principal]` con éxito (201)
- `POST /[principal]` con ID de secundaria inválido (400)
- `POST /[principal]` con campo único duplicado (409)

---

## 🔗 Recursos

- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- Teoría semana 06: `1-teoria/`
