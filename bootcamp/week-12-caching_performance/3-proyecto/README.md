# 🚀 Proyecto Semanal — Semana 12: Caching y Performance

## 🎯 Objetivo

Construir una API REST sobre el dominio asignado que incorpore:
- **Caché con Redis** para reducir carga en la base de datos
- **Paginación por cursor** en el endpoint principal de listado
- **Compresión gzip** con el middleware `compression`

---

## 📋 Tu Dominio Asignado

**Dominio**: _[El instructor te asignará tu dominio — Biblioteca / Farmacia / Gimnasio / etc.]_

Adapta los recursos y rutas al contexto de tu dominio.

---

## 🗂️ Estructura del proyecto

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
├── prisma/
│   └── schema.prisma
└── src/
    ├── config/env.ts
    ├── lib/
    │   ├── prisma.ts
    │   └── redis.ts            ← TODO: conectar con ioredis
    ├── middlewares/
    │   ├── cache.middleware.ts ← TODO: implementar cache-aside
    │   ├── auth.middleware.ts
    │   └── error.middleware.ts
    ├── validators/
    │   ├── auth.schema.ts
    │   ├── item.schema.ts      ← TODO: adaptar al dominio
    │   └── pagination.schema.ts
    ├── repositories/
    │   ├── users.repository.ts
    │   └── items.repository.ts  ← TODO: implementar con cursor
    ├── services/
    │   ├── auth.service.ts
    │   └── items.service.ts     ← TODO: integrar caché
    ├── controllers/
    │   ├── auth.controller.ts
    │   └── items.controller.ts  ← TODO: implementar
    ├── routes/
    │   ├── auth.routes.ts
    │   └── items.routes.ts
    ├── utils/jwt.ts
    ├── errors/AppError.ts
    ├── app.ts                   ← TODO: registrar compression y rutas
    └── server.ts
```

---

## ✅ Requisitos Funcionales

### Autenticación (dado)
- `POST /api/v1/auth/register` — Registrar usuario
- `POST /api/v1/auth/login` — Login con JWT

### Recurso principal del dominio
1. `GET /api/v1/items` — Listar con **cursor pagination** y caché Redis
2. `GET /api/v1/items/:id` — Detalle con caché Redis
3. `POST /api/v1/items` — Crear (requiere auth, invalida caché)
4. `PUT /api/v1/items/:id` — Actualizar (requiere auth, invalida caché)
5. `DELETE /api/v1/items/:id` — Eliminar (requiere auth, invalida caché)

### Performance
6. **Compresión gzip** habilitada (`compression` middleware)
7. **Header `X-Cache: HIT/MISS`** en respuestas GET
8. **Header `X-Response-Time`** en todas las respuestas

---

## 💡 Ejemplos de Adaptación por Dominio

| Dominio | Recurso principal | Campos sugeridos |
|---------|-------------------|------------------|
| Biblioteca | `Book` | title, author, isbn, pages, genre |
| Farmacia | `Medicine` | name, activeIngredient, price, stock |
| Gimnasio | `Equipment` | name, type, quantity, maintenanceDate |
| Restaurante | `Dish` | name, price, category, isAvailable |
| Hotel | `Room` | number, type, capacity, pricePerNight |
| Escuela | `Course` | title, teacher, credits, schedule |

---

## 🛠️ Instalación

```bash
cd starter
pnpm install
cp .env.example .env
# Edita .env con DATABASE_URL y REDIS_URL

# Crear la base de datos y tablas
pnpm prisma migrate dev --name init

# Iniciar Redis (si no está corriendo)
docker run -d -p 6379:6379 redis:7-alpine

# Iniciar servidor de desarrollo
pnpm dev
```

---

## 📊 Entregables

1. **API funcionando** con Postman/Thunder Client screenshots que muestren:
   - `X-Cache: MISS` en primera petición
   - `X-Cache: HIT` en segunda petición al mismo endpoint
   - `Content-Encoding: gzip` en respuestas
   - Paginación cursor con `hasNextPage` y `nextCursor`
2. **Código adaptado** al dominio asignado (modelo, validadores, rutas)
3. **README** en tu entregable explicando el dominio elegido y endpoints implementados
