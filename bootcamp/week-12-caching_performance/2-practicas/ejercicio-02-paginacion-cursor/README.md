# Ejercicio 02: Paginación por Cursor con Prisma

En este ejercicio implementarás paginación por cursor sobre PostgreSQL usando Prisma.
La respuesta incluirá `hasNextPage` y `nextCursor` para navegar el feed sin degradación
de rendimiento aunque la tabla tenga millones de registros.

---

## 🎯 Objetivos

- Implementar `findMany` con `cursor` y `skip: 1` en Prisma
- Usar el truco del **N+1** para calcular `hasNextPage` sin `count()`
- Retornar `nextCursor` como el ID del último elemento de la página
- Validar `cursor` y `limit` con Zod en query params

---

## 📋 Pre-requisitos

- PostgreSQL corriendo en local:
  ```bash
  docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres --name pg-dev postgres:16-alpine
  ```
- Conocer Prisma basics: `findMany`, `orderBy`, `where`

---

## 🗂️ Estructura del ejercicio

```
ejercicio-02-paginacion-cursor/
└── starter/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    ├── prisma/
    │   └── schema.prisma       (dado)
    └── src/
        ├── config/env.ts       (dado)
        ├── lib/prisma.ts       (dado)
        ├── validators/
        │   └── pagination.schema.ts   (PASO 1 — comentado)
        ├── services/
        │   └── article.service.ts     (PASO 2, 3 — comentado)
        ├── controllers/
        │   └── article.controller.ts  (dado)
        ├── routes/
        │   └── article.routes.ts      (dado)
        ├── app.ts              (dado)
        └── server.ts           (dado)
```

---

## Paso 1: Validar parámetros de paginación

**Abre `starter/src/validators/pagination.schema.ts`** y descomenta el `PASO 1`.

Los query params llegan como strings, hay que convertirlos a número con `coerce`.
El cursor es opcional (primera página no tiene cursor).

**Conceptos:**
```typescript
const cursorPaginationSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
```

---

## Paso 2: Query con cursor en Prisma

**Abre `starter/src/services/article.service.ts`** y descomenta el `PASO 2`.

La clave está en el objeto condicional `...(cursor && { cursor, skip: 1 })`.
Si hay cursor, Prisma busca desde después de ese ID.

**Conceptos:**
```typescript
const items = await prisma.article.findMany({
  take,
  ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  orderBy: { createdAt: 'desc' },
});
```

---

## Paso 3: Calcular `hasNextPage` y `nextCursor`

**Continúa en `article.service.ts`** y descomenta el `PASO 3`.

Pedimos `limit + 1` elementos. Si obtenemos más de `limit`, hay página siguiente.
El `nextCursor` es el ID del último elemento que SÍ retornamos.

**Conceptos:**
```typescript
const hasNextPage = items.length > limit;
const data = hasNextPage ? items.slice(0, limit) : items;
const nextCursor = hasNextPage ? data[data.length - 1].id : null;
```

---

## 🚀 Ejecutar el ejercicio

```bash
cd starter
pnpm install
cp .env.example .env
# Edita .env con tu DATABASE_URL
pnpm prisma migrate dev --name init
pnpm prisma db seed   # carga 50 artículos de ejemplo
pnpm dev
```

### Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/articles` | Primera página (sin cursor) |
| GET | `/api/v1/articles?limit=5` | Página con 5 artículos |
| GET | `/api/v1/articles?cursor=ID&limit=5` | Página siguiente |
| GET | `/api/v1/articles/offset` | Paginación clásica (para comparar) |
| GET | `/health` | Estado del servidor |

### Flujo esperado

```bash
# Primera página
curl "http://localhost:3000/api/v1/articles?limit=3"
# { data: [...3 artículos], hasNextPage: true, nextCursor: "abc6" }

# Segunda página — usar el nextCursor recibido
curl "http://localhost:3000/api/v1/articles?cursor=abc6&limit=3"
# { data: [...3 artículos], hasNextPage: true, nextCursor: "abc3" }

# Última página
curl "http://localhost:3000/api/v1/articles?cursor=abc3&limit=3"
# { data: [...1 artículo], hasNextPage: false, nextCursor: null }
```
