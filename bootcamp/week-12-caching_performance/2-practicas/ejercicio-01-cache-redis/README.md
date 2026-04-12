# Ejercicio 01: Middleware de Caché con Redis

En este ejercicio construirás un middleware de caché HTTP que intercepta
respuestas GET, las guarda en Redis con TTL y las invalida cuando cambian los datos.
Al final, el endpoint de listado responderá en ~1ms en lugar de ~80ms.

---

## 🎯 Objetivos

- Conectar a Redis con **ioredis**
- Implementar el patrón **cache-aside** en un middleware Express
- Invalidar caché en operaciones de escritura
- Verificar el funcionamiento con el header `X-Cache: HIT/MISS`

---

## 📋 Pre-requisitos

- Redis corriendo en local:
  ```bash
  docker run -d -p 6379:6379 --name redis-dev redis:7-alpine
  ```
- Conocer `redis.get`, `redis.set` con TTL, `redis.del`

---

## 🗂️ Estructura del ejercicio

```
ejercicio-01-cache-redis/
└── starter/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── config/env.ts         (dado)
        ├── lib/redis.ts          (PASO 1 — comentado)
        ├── data/products.ts      (dado — datos en memoria)
        ├── middlewares/
        │   └── cache.middleware.ts   (PASO 2, 3 — comentado)
        ├── routes/
        │   └── product.routes.ts     (dado)
        ├── controllers/
        │   └── product.controller.ts (PASO 4 — comentado invalidación)
        ├── app.ts                (dado)
        └── server.ts             (dado)
```

---

## Paso 1: Crear la conexión a Redis

**Abre `starter/src/lib/redis.ts`** y descomenta la sección del `PASO 1`.

El cliente `ioredis` necesita la URL de conexión desde `env.REDIS_URL` y
configuración de reconexión automática con `retryStrategy`.

**Conceptos:**
```typescript
// ioredis acepta la URL completa: redis://localhost:6379
const redis = new Redis(url, {
  retryStrategy: (times) => Math.min(times * 50, 2000),
  lazyConnect: true,
});
```

Verifica que al ejecutar el servidor veas `✅ Redis conectado` en la consola.

---

## Paso 2: Leer desde caché (GET)

**Abre `starter/src/middlewares/cache.middleware.ts`** y descomenta el `PASO 2`.

Este paso implementa la lectura: si la clave existe en Redis, retornar
la respuesta directamente sin llegar al controlador.

**Conceptos:**
```typescript
const cached = await redis.get(key);
if (cached) {
  res.setHeader('X-Cache', 'HIT');
  return res.json(JSON.parse(cached));
}
res.setHeader('X-Cache', 'MISS');
```

Verifica con:
```bash
curl -I http://localhost:3000/api/v1/products
# Primera llamada: X-Cache: MISS
# Segunda llamada: X-Cache: HIT
```

---

## Paso 3: Guardar en caché (SET)

**Continúa en `cache.middleware.ts`** y descomenta el `PASO 3`.

Aquí interceptas `res.json` para capturar el body de la respuesta y
guardarlo en Redis con el TTL configurado.

**Conceptos:**
```typescript
const originalJson = res.json.bind(res);
res.json = (body: unknown) => {
  redis.set(key, JSON.stringify(body), 'EX', ttl).catch(console.error);
  return originalJson(body);
};
next();
```

---

## Paso 4: Invalidar caché al mutar datos

**Abre `starter/src/controllers/product.controller.ts`** y descomenta el `PASO 4`.

Cuando se crea o elimina un producto, hay que eliminar las claves de caché
del listado para que el próximo GET reconstruya la caché con datos frescos.

**Conceptos:**
```typescript
// Después de crear/eliminar en la fuente de datos:
const keys = await redis.keys('cache:/api/v1/products*');
if (keys.length) await redis.unlink(...keys);
```

Verifica:
1. `GET /api/v1/products` → `X-Cache: MISS` → datos en caché
2. `GET /api/v1/products` → `X-Cache: HIT`
3. `POST /api/v1/products` (crea uno nuevo)
4. `GET /api/v1/products` → `X-Cache: MISS` (caché invalidada)
5. `GET /api/v1/products` → `X-Cache: HIT` (datos frescos cacheados)

---

## 🚀 Ejecutar el ejercicio

```bash
cd starter
pnpm install
cp .env.example .env
pnpm dev
```

### Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/products` | Listado (cacheado 30s) |
| GET | `/api/v1/products/:id` | Detalle (cacheado 60s) |
| POST | `/api/v1/products` | Crear (invalida caché) |
| DELETE | `/api/v1/products/:id` | Eliminar (invalida caché) |
| GET | `/health` | Estado del servidor y Redis |
