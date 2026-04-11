# Controllers y Services

## 🎯 Objetivos

Al finalizar este archivo, comprenderás:

- Qué es un "thin controller" y por qué es la práctica correcta
- Cómo pasar datos del controller al service sin pasar `req`
- Cómo estructurar un service para que sea testeable
- Cómo manejar errores entre capas

## 📋 Controllers: La regla de los 3 pasos

Un controller bien escrito hace exactamente 3 cosas:

1. **Extraer** datos de `req` (params, body, query)
2. **Llamar** al service con esos datos
3. **Responder** con `res.json()` usando el resultado

Si hace más de eso, hay que mover la lógica extra al service.

```ts
// src/controllers/users.controller.ts
import type { Request, Response, NextFunction } from 'express';
import * as usersService from '../services/users.service.js';

// ✅ BIEN — thin controller: extrae, delega, responde
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}

// ❌ MAL — lógica de negocio en el controller
export async function createBad(req: Request, res: Response): Promise<void> {
  const { email, password, name } = req.body;
  // ❌ La validación de negocio pertenece al service
  if (password.length < 8) {
    res.status(400).json({ error: 'Password too short' });
    return;
  }
  // ❌ El hash de passwords pertenece al service
  const hashed = await bcrypt.hash(password, 10);
  // ❌ El acceso a datos pertenece al repository
  const user = await db.users.create({ email, password: hashed, name });
  res.status(201).json(user);
}
```

## 📚 Patrón completo de un controller CRUD

```ts
// src/controllers/products.controller.ts
import type { Request, Response, NextFunction } from 'express';
import * as productsService from '../services/products.service.js';
import type { CreateProductDto, UpdateProductDto } from '../types.js';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const result = await productsService.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productsService.findById(Number(req.params.id));
    if (!product) {
      res.status(404).json({ error: 'Not Found', message: 'Product not found' });
      return;
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateProductDto;
    const product = await productsService.create(dto);
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as UpdateProductDto;
    const product = await productsService.update(Number(req.params.id), dto);
    if (!product) {
      res.status(404).json({ error: 'Not Found', message: 'Product not found' });
      return;
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await productsService.remove(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: 'Product not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
```

## 📚 Services: Lógica pura y testeable

El service no importa nada de Express. Solo recibe datos planos y retorna datos planos. Esto lo hace 100% testeable con Jest sin levantar el servidor.

```ts
// src/services/products.service.ts
import * as productsRepository from '../repositories/products.repository.js';
import type { CreateProductDto, UpdateProductDto, PaginationParams } from '../types.js';

// La lógica de negocio vive aquí: cálculos, transformaciones, validaciones de dominio
export async function findAll(params: PaginationParams) {
  const all = await productsRepository.findAll();
  const total = all.length;

  // Paginación — lógica de negocio, no del controller
  const start = (params.page - 1) * params.limit;
  const data = all.slice(start, start + params.limit);

  return { data, total, page: params.page, limit: params.limit };
}

export async function findById(id: number) {
  return productsRepository.findById(id);
}

export async function create(dto: CreateProductDto) {
  // Aquí podrían ir reglas de negocio:
  // - verificar que el nombre es único
  // - calcular precio con impuestos
  // - enviar email de notificación
  return productsRepository.create(dto);
}

export async function update(id: number, dto: UpdateProductDto) {
  const existing = await productsRepository.findById(id);
  if (!existing) return undefined;
  return productsRepository.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const existing = await productsRepository.findById(id);
  if (!existing) return false;
  return productsRepository.remove(id);
}
```

## 📚 Manejo de errores entre capas

Hay dos estrategias para manejar errores en la arquitectura en capas:

### Estrategia A: Retornar `undefined` (para casos esperados)

Cuando un recurso no existe, el repository retorna `undefined`. El controller decide el status code.

```ts
// repository: retorna undefined si no existe
export async function findById(id: number): Promise<Product | undefined> { ... }

// service: propaga el undefined
export async function findById(id: number) {
  return productsRepository.findById(id); // undefined si no existe
}

// controller: maneja el 404
const product = await productsService.findById(id);
if (!product) { res.status(404).json({ error: 'Not Found', ... }); return; }
```

### Estrategia B: Lanzar errores tipados (se verá en semana 04 con Zod)

```ts
// En semana 04 usaremos una clase AppError para errores de negocio:
// throw new AppError(404, 'Product not found');
// El error handler global lo captura y responde correctamente
```

## ✅ Checklist de Verificación

- [ ] El controller no contiene lógica de negocio (sin `if` de dominio, sin cálculos)
- [ ] El controller no accede directamente al repository
- [ ] El service no usa `req`, `res` ni `next`
- [ ] El service puede llamarse desde un test sin Express
- [ ] Los métodos del service son `async` y retornan datos tipados
