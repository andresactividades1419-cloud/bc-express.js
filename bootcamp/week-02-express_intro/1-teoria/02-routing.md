# Routing en Express

## 🎯 Objetivos

Al finalizar este archivo, comprenderás:

- Cómo definir rutas con los métodos HTTP correctos
- La diferencia entre `req.params`, `req.query` y `req.body`
- Cómo usar `express.Router()` para modularizar las rutas
- Cuándo usar rutas anidadas y cómo registrarlas en `app.ts`

## 📋 Métodos HTTP y Rutas

Cada ruta en una API REST combina un **verb HTTP** con un **path**:

```ts
import { Router } from 'express';

const router = Router();

// GET /products         → listar todos
router.get('/', async (_req, res) => {
  res.json({ data: [], total: 0 });
});

// GET /products/:id     → obtener uno
router.get('/:id', async (req, res) => {
  const { id } = req.params; // leer parámetro de ruta
  res.json({ id, name: 'Example' });
});

// POST /products        → crear
router.post('/', async (req, res) => {
  const body = req.body; // requiere express.json() activo
  res.status(201).json(body);
});

// PUT /products/:id     → reemplazar completo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  res.json({ id, ...req.body });
});

// DELETE /products/:id  → eliminar
router.delete('/:id', async (req, res) => {
  res.status(204).send(); // 204 No Content
});

export default router;
```

## 📋 req.params vs req.query vs req.body

Los tres son formas de enviar datos al servidor, pero en partes distintas de la petición:

```ts
// Ruta: GET /products/:id?include=category&page=2
// Body: { "name": "Laptop" }  ← solo en POST/PUT/PATCH

router.get('/:id', (req, res) => {
  // req.params — segmentos dinámicos del path (/products/123)
  const { id } = req.params;         // "123"

  // req.query — query string (?include=category&page=2)
  const { include, page } = req.query; // "category", "2"
  // Nota: req.query siempre llega como string, parsear si es número
  const pageNumber = Number(page) || 1;

  // req.body — cuerpo de la petición (JSON, form-data)
  // Solo disponible en POST, PUT, PATCH
  const { name } = req.body;          // "Laptop"

  res.json({ id, include, pageNumber, name });
});
```

## 📋 Router Modular

Con `express.Router()` separamos las rutas por recurso:

```ts
// src/routes/products.routes.ts
import { Router } from 'express';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
```

```ts
// src/app.ts — registrar el router con prefijo
import productsRouter from './routes/products.routes.js';

app.use('/api/v1/products', productsRouter);
// Resultado: GET /api/v1/products, POST /api/v1/products/:id, etc.
```

> 💡 **Prefijo `/api/v1/`**: Indica que es una API y está versionada. Si en el futuro rompes compatibilidad, puedes publicar `/api/v2/` sin afectar clientes de v1.

## 📋 Rutas con Parámetros Opcionales

```ts
// Parámetro opcional con ?
router.get('/search/:term?', (req, res) => {
  const { term } = req.params; // puede ser undefined
  res.json({ term: term ?? 'all' });
});

// Múltiples parámetros
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({ categoryId, productId });
});
```

## 📋 Convenciones REST para Paths

| Operación | Método | Path | Estado |
|-----------|--------|------|:------:|
| Listar todos | `GET` | `/products` | 200 |
| Obtener uno | `GET` | `/products/:id` | 200 / 404 |
| Crear | `POST` | `/products` | 201 |
| Actualizar completo | `PUT` | `/products/:id` | 200 / 404 |
| Actualizar parcial | `PATCH` | `/products/:id` | 200 / 404 |
| Eliminar | `DELETE` | `/products/:id` | 204 / 404 |

> ⚠️ El path siempre en **plural** y **kebab-case**: `/products`, `/blog-posts`, `/order-items`.

## 📚 Recursos Adicionales

- [Express 5 — Routing guide](https://expressjs.com/en/guide/routing.html)
- [RESTful API Design — Best Practices](https://restfulapi.net/)

## ✅ Checklist de Verificación

- [ ] Las rutas usan el método HTTP correcto (no todo en GET)
- [ ] Los parámetros dinámicos se leen de `req.params`
- [ ] La query string se lee de `req.query` y se parsea a número si aplica
- [ ] El body se lee de `req.body` (con `express.json()` activo)
- [ ] Los paths son en plural y minúsculas
- [ ] El router está registrado con prefijo `/api/v1/` en `app.ts`
