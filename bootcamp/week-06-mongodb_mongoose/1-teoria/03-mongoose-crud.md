# Mongoose — CRUD y Manejo de Errores

## 🎯 Objetivos

- Implementar las 5 operaciones CRUD con Mongoose
- Aplicar paginación, filtros y proyección
- Manejar los errores específicos de MongoDB (11000, CastError)

## Patrón Repository con Mongoose

Al igual que en Prisma, separamos el acceso a datos en un repositorio. La diferencia es que en lugar de un cliente inyectado, usamos el Model directamente.

```ts
// src/repositories/products.repository.ts
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Product } from '../models/product.model';
import { AppError } from '../errors/AppError';
import type { CreateProductDto, UpdateProductDto } from '../schemas/product.schema';

// Paginación
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
```

## findAll — Listar con Paginación y Filtros

```ts
export async function findAll(
  params: PaginationParams,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  const { page, limit } = params;
  const skip = (page - 1) * limit;

  // Filtro dinámico (buscar por nombre)
  const filter = search
    ? { name: { $regex: search, $options: 'i' } } // i = case-insensitive
    : {};

  // Ejecutar query y conteo en paralelo
  const [data, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })  // más reciente primero
      .skip(skip)
      .limit(limit)
      .lean(),                   // devuelve objetos JS planos (sin métodos Mongoose)
    Product.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
```

### `.lean()` — Por qué es importante

| Sin `.lean()` | Con `.lean()` |
|--------------|---------------|
| Devuelve instancias de `Document` | Devuelve objetos JS planos |
| Incluye métodos `save()`, `remove()`, etc. | Sin métodos — solo datos |
| Mayor uso de memoria | Más ligero y rápido |
| Necesario si vas a llamar `.save()` | Recomendado para endpoints GET |

## findById — Buscar por ID

```ts
export async function findById(id: string): Promise<unknown> {
  try {
    const product = await Product.findById(id).lean();

    if (!product) {
      throw new AppError(404, 'Producto no encontrado');
    }

    return product;
  } catch (err) {
    // CastError: el string no tiene formato de ObjectId válido (24 hex chars)
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
```

## create — Crear Documento

```ts
export async function create(dto: CreateProductDto): Promise<unknown> {
  try {
    // Model.create() aplica validaciones del schema antes de insertar
    const product = await Product.create(dto);
    return product.toJSON();
  } catch (err) {
    // 11000: violación de índice unique (ej. SKU duplicado)
    if (err instanceof MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyValue ?? {})[0] ?? 'campo';
      throw new AppError(409, `El ${field} ya está registrado`);
    }
    throw err;
  }
}
```

## update — Actualizar por ID

```ts
export async function update(id: string, dto: UpdateProductDto): Promise<unknown> {
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      dto,
      {
        new: true,            // retorna el documento DESPUÉS de la actualización
        runValidators: true,  // aplica validaciones del schema en el update
      },
    ).lean();

    if (!product) {
      throw new AppError(404, 'Producto no encontrado');
    }

    return product;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      const field = Object.keys(err.keyValue ?? {})[0] ?? 'campo';
      throw new AppError(409, `El ${field} ya está registrado`);
    }
    throw err;
  }
}
```

## remove — Eliminar por ID

```ts
export async function remove(id: string): Promise<void> {
  try {
    const product = await Product.findByIdAndDelete(id).lean();

    if (!product) {
      throw new AppError(404, 'Producto no encontrado');
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
```

## Filtros — Operadores de Query

```ts
// Comparación
Product.find({ price: { $gte: 100, $lte: 500 } })   // entre 100 y 500
Product.find({ stock: { $gt: 0 } })                   // stock > 0
Product.find({ active: { $ne: false } })               // activo != false

// Texto
Product.find({ name: { $regex: 'shirt', $options: 'i' } }) // contains "shirt" (case-insensitive)

// Conjuntos
Product.find({ category: { $in: ['cat1', 'cat2'] } }) // category es cat1 o cat2

// OR lógico
Product.find({
  $or: [
    { name: { $regex: 'shirt', $options: 'i' } },
    { sku: { $regex: 'SHIRT', $options: 'i' } },
  ],
})
```

## Proyección — `.select()`

```ts
// Incluir solo ciertos campos (1 = incluir, 0 = excluir)
Product.find().select('name price stock')        // solo esos campos
Product.find().select('-__v -createdAt')         // todos excepto esos
Product.findById(id).select('name price -_id')  // incluir name y price, excluir _id
```

## Manejo de Errores — Guía Completa

| Error | Causa | HTTP |
|-------|-------|------|
| `MongoServerError` con `code: 11000` | Índice unique violado (SKU duplicado, email duplicado) | 409 Conflict |
| `mongoose.Error.CastError` | ID no tiene formato ObjectId válido | 400 Bad Request |
| `findById` / `findByIdAndUpdate` devuelve `null` | Documento no existe | 404 Not Found |

```ts
// Importaciones necesarias para manejo de errores
import { MongoServerError } from 'mongodb';    // error de nivel servidor MongoDB
import mongoose from 'mongoose';               // acceso a mongoose.Error.CastError
```

> **Nota**: A diferencia de Prisma que lanza `PrismaClientKnownRequestError` con código `P2002` o `P2025`, en Mongoose **debes verificar `null` manualmente** — no hay excepción automática cuando el documento no existe.

## ✅ Checklist de Verificación

- [ ] Cada operación CRUD está en su propia función exportada
- [ ] `findAll` usa `.lean()` y devuelve `{ data, total, page, totalPages }`
- [ ] `findById` captura `CastError` y arroja `AppError(400, 'ID inválido')`
- [ ] `create` captura error `11000` y arroja `AppError(409, '...')`
- [ ] `findByIdAndUpdate` usa `{ new: true, runValidators: true }`
- [ ] `findByIdAndUpdate` y `findByIdAndDelete` verifican si el resultado es `null` → `AppError(404)`
- [ ] Ninguna función usa `async/await` sin `try/catch` cuando puede lanzar CastError o MongoServerError
