# Ejercicio 01 — Mongoose Setup: CRUD de Productos

## 🎯 Objetivo

Conectar Express con MongoDB usando Mongoose, definir un schema con validadores, e implementar el repositorio CRUD completo — incluyendo paginación, manejo de errores 11000 y CastError.

## 📋 Requisitos previos

- Docker Desktop corriendo
- Semanas 01–05 completadas
- Variables de entorno configuradas (`.env`)

## 🗂️ Estructura del ejercicio

```
ejercicio-01-mongoose-setup/
└── starter/
    ├── docker-compose.yml
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── lib/
        │   └── mongoose.ts        ← connectDB / disconnectDB
        ├── models/
        │   └── product.model.ts   ← PASO 1: Schema y Model
        ├── errors/
        │   └── AppError.ts
        ├── middlewares/
        │   ├── errorHandler.ts
        │   └── notFound.ts
        ├── schemas/
        │   └── product.schema.ts  ← Validación Zod
        ├── repositories/
        │   └── products.repository.ts  ← PASO 3 + 4
        ├── services/
        │   └── products.service.ts
        ├── controllers/
        │   └── products.controller.ts
        ├── routes/
        │   └── products.routes.ts
        ├── app.ts
        ├── server.ts              ← PASO 2: connectDB
        └── seed.ts                ← PASO 5: insertar datos
```

---

## Paso 1 — Definir el Schema y el Model

### ¿Qué es un Schema en Mongoose?

Un Schema define la estructura del documento (equivale a la tabla en SQL). Le decimos a Mongoose qué campos acepta, qué tipo tienen y qué validaciones aplican.

```ts
// Ejemplo de definición mínima
import { Schema, model } from 'mongoose';

interface IProduct {
  name: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  name:  { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export const Product = model<IProduct>('Product', productSchema);
```

**Abre `starter/src/models/product.model.ts`** y descomenta la sección marcada como **PASO 1**.

---

## Paso 2 — Conectar a MongoDB antes de iniciar el servidor

### ¿Por qué conectar antes de `app.listen()`?

Mongoose mantiene un estado de conexión global. Si ejecutamos queries antes de conectar, fallarán silenciosamente. Por eso debemos `await connectDB()` **antes** de `app.listen()`.

```ts
// Patrón correcto en server.ts
await connectDB();          // ← primero la conexión
app.listen(PORT, ...);      // ← luego el servidor
```

**Abre `starter/src/server.ts`** y descomenta la sección marcada como **PASO 2**.

Luego levanta MongoDB con Docker:

```bash
cd starter
docker compose up -d
```

Verifica que el servidor inicia sin errores:

```bash
pnpm dev
```

Deberías ver en consola:
```
MongoDB connected
Server running on port 3000
```

---

## Paso 3 — Implementar `findAll` con paginación

### `find()` vs `findOne()`

- `find(filter)` → devuelve **array** (nunca null, puede ser vacío `[]`)
- `findOne(filter)` → devuelve **un documento** o `null`
- `.lean()` → convierte el resultado a objeto JS plano (sin métodos Mongoose) — siempre usarlo en queries de lectura

```ts
// Ejemplo de findAll con paginación
const skip = (page - 1) * limit;
const [data, total] = await Promise.all([
  Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  Product.countDocuments(),
]);
```

**Abre `starter/src/repositories/products.repository.ts`** y descomenta la sección marcada como **PASO 3**.

Prueba con Thunder Client / Postman:
```
GET http://localhost:3000/api/v1/products?page=1&limit=5
```

---

## Paso 4 — Implementar `findById`, `create`, `update` y `remove`

### Errores específicos de MongoDB que debes manejar

| Error | Causa | Cómo detectarlo |
|-------|-------|-----------------|
| `MongoServerError` code `11000` | Campo único duplicado (ej. SKU) | `err.code === 11000` |
| `mongoose.Error.CastError` | ObjectId inválido en `findById` | `err instanceof mongoose.Error.CastError` |
| `null` devuelto | Documento no existe | Verificar `if (!product)` |

```ts
// Ejemplo de manejo en create
import { MongoServerError } from 'mongodb';

try {
  const product = await Product.create(dto);
  return product.toJSON();
} catch (err) {
  if (err instanceof MongoServerError && err.code === 11000) {
    throw new AppError(409, 'El SKU ya está registrado');
  }
  throw err;
}
```

**Abre `starter/src/repositories/products.repository.ts`** y descomenta la sección marcada como **PASO 4**.

Prueba con Thunder Client / Postman:
```bash
# Crear producto
POST http://localhost:3000/api/v1/products
Content-Type: application/json
{ "name": "Camiseta Polo", "price": 59900, "sku": "POLO-001", "stock": 10 }

# Duplicar SKU (debe retornar 409)
POST http://localhost:3000/api/v1/products
{ "name": "Otra", "price": 10000, "sku": "POLO-001", "stock": 5 }

# ID inválido (debe retornar 400)
GET http://localhost:3000/api/v1/products/id-invalido
```

---

## Paso 5 — Insertar datos de prueba con el seed

Para que el endpoint GET devuelva resultados interesantes, necesitas datos. El seed inserta varios productos de ejemplo en MongoDB.

```ts
// Ejemplo de seed básico
await connectDB();
await Product.deleteMany({});  // limpia colección
await Product.insertMany([
  { name: 'Camiseta Polo', price: 59900, sku: 'POLO-001', stock: 10 },
  { name: 'Sudadera Negra', price: 89900, sku: 'SWEAT-001', stock: 5 },
]);
await disconnectDB();
```

**Abre `starter/src/seed.ts`** y descomenta la sección marcada como **PASO 5**.

Ejecuta el seed:
```bash
pnpm seed
```

Verifica con:
```
GET http://localhost:3000/api/v1/products
```

---

## ✅ Criterios de Verificación

- [ ] `GET /products` devuelve `{ data, total, page, totalPages }` con `.lean()`
- [ ] `GET /products/:id` con ID inválido retorna `400 "ID inválido"`
- [ ] `GET /products/:id` con ID inexistente retorna `404`
- [ ] `POST /products` con SKU duplicado retorna `409`
- [ ] `PUT /products/:id` actualiza con `{ new: true, runValidators: true }`
- [ ] `DELETE /products/:id` elimina y retorna `204`
- [ ] `connectDB()` se llama en `server.ts`, antes de `app.listen()`
- [ ] Ningún `mongoose.connect()` aparece dentro de rutas o controladores
