# Ejercicio 02 — Populate: Productos con Categorías

## 🎯 Objetivo

Agregar una entidad `Category` al proyecto del ejercicio anterior. Los productos referenciarán categorías usando `Schema.Types.ObjectId`. Usarás `.populate()` para que los endpoints devuelvan el objeto de categoría completo en vez del ObjectId crudo.

## 📋 Requisitos previos

- Ejercicio 01 completado y funcionando
- Docker con MongoDB corriendo

## 🗂️ Estructura del ejercicio

```
ejercicio-02-populate/
└── starter/
    ├── docker-compose.yml   (igual al ej-01)
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── lib/mongoose.ts                     (dado)
        ├── models/
        │   ├── category.model.ts               (dado — schema de Category)
        │   └── product.model.ts                ← PASO 1: añadir campo category
        ├── errors/AppError.ts                  (dado)
        ├── middlewares/                        (dado)
        ├── schemas/
        │   ├── category.schema.ts              (dado)
        │   └── product.schema.ts               ← PASO 2: añadir campo category
        ├── repositories/
        │   ├── categories.repository.ts        (dado)
        │   └── products.repository.ts          ← PASO 4: añadir .populate()
        ├── services/
        │   ├── categories.service.ts           (dado)
        │   └── products.service.ts             (dado)
        ├── controllers/
        │   ├── categories.controller.ts        (dado)
        │   └── products.controller.ts          (dado)
        ├── routes/
        │   ├── categories.routes.ts            (dado)
        │   └── products.routes.ts              (dado)
        ├── app.ts                              ← PASO 5: registrar router de categories
        ├── server.ts                           (dado — connectDB ya activo)
        └── seed.ts                             ← PASO 3: insertar categories primero
```

---

## Paso 1 — Añadir el campo `category` al schema de Producto

### ¿Qué es `Schema.Types.ObjectId`?

Es el tipo de Mongoose para almacenar referencias. En la colección se guarda solo el ID (24 caracteres hex), pero `populate()` lo reemplaza con el documento completo al leer.

```ts
// Estructura de referencia en el schema
category: {
  type: Schema.Types.ObjectId,  // tipo: ObjectId de MongoDB
  ref: 'Category',              // nombre del Model al que apunta
  required: true,
}
```

**Abre `starter/src/models/product.model.ts`** y descomenta la sección marcada como **PASO 1** (campo `category` en la interfaz y en el schema).

---

## Paso 2 — Validar el ObjectId en Zod

El campo `category` que llega en el body del request es un string. Zod debe verificar que tenga el formato correcto (24 caracteres hexadecimales) antes de pasarlo al repositorio.

```ts
// Validación de ObjectId en Zod
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
category: z.string().regex(objectIdRegex, 'ID de categoría inválido')
```

**Abre `starter/src/schemas/product.schema.ts`** y descomenta el campo `category` en el schema Zod marcado como **PASO 2**.

---

## Paso 3 — Actualizar el seed: insertar categorías primero

### ¿Por qué el orden importa?

Los productos referencian categorías por ObjectId. Si insertas productos sin categorías existentes, el ObjectId apuntará a documentos inexistentes. El seed debe:

1. Limpiar ambas colecciones
2. Insertar categorías y capturar sus `_id`
3. Usar esos `_id` al insertar los productos

```ts
// Patrón correcto en el seed
await Category.deleteMany({});
await Product.deleteMany({});

// Insertar categorías y obtener sus IDs
const [ropa, calzado] = await Category.insertMany([
  { name: 'Ropa' },
  { name: 'Calzado' },
]);

// Usar los IDs al crear productos
await Product.insertMany([
  { name: 'Camiseta', price: 59900, sku: 'CAM-001', category: ropa._id },
  { name: 'Zapatilla', price: 129900, sku: 'ZAP-001', category: calzado._id },
]);
```

**Abre `starter/src/seed.ts`** y descomenta la sección marcada como **PASO 3**.

Ejecuta el seed:
```bash
pnpm seed
```

---

## Paso 4 — Agregar `.populate('category')` en el repositorio

Sin populate, el endpoint devuelve:
```json
{ "_id": "...", "name": "Camiseta", "category": "664abc..." }
```

Con populate, devuelve:
```json
{ "_id": "...", "name": "Camiseta", "category": { "_id": "664abc...", "name": "Ropa" } }
```

```ts
// Agregar .populate() a las queries de lectura
const products = await Product.find().populate('category').lean();
const product  = await Product.findById(id).populate('category').lean();
```

**Abre `starter/src/repositories/products.repository.ts`** y descomenta los `.populate('category')` marcados como **PASO 4** en `findAll` y `findById`.

Prueba el resultado:
```
GET http://localhost:3000/api/v1/products
```
El campo `category` ahora debe ser un objeto, no un string.

---

## Paso 5 — Registrar el router de categorías en `app.ts`

Para que los endpoints de categorías funcionen, el router debe montarse en Express.

```ts
// Montar el router de categorías
app.use('/api/v1/categories', categoriesRouter);
```

**Abre `starter/src/app.ts`** y descomenta la línea marcada como **PASO 5**.

Prueba los endpoints de categorías:
```
GET  http://localhost:3000/api/v1/categories
POST http://localhost:3000/api/v1/categories
     Body: { "name": "Tecnología" }
```

---

## 📊 Diagrama de Relación

```
categories              products
┌─────────────────┐     ┌──────────────────────────────┐
│ _id: ObjectId   │◄────│ category: Schema.Types.ObjectId│
│ name: string    │     │ name: string                  │
│ createdAt: Date │     │ price: number                 │
└─────────────────┘     │ sku: string (unique)          │
                        └──────────────────────────────┘
```

---

## ✅ Criterios de Verificación

- [ ] `GET /products` devuelve el campo `category` como objeto (no como string ObjectId)
- [ ] `GET /products/:id` también populea la categoría
- [ ] `POST /products` con `category` inválido (no ObjectId) retorna `400`
- [ ] El seed inserta categorías primero y luego productos con sus IDs reales
- [ ] `GET /categories` lista las categorías correctamente
- [ ] `POST /categories` crea una categoría y retorna `201`
- [ ] El diagrama en este README muestra la relación entre las colecciones
