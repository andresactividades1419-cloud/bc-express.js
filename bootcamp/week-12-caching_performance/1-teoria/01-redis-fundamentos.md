# Redis: Fundamentos y ioredis

## 🎯 Objetivos

- Entender qué es Redis y por qué se usa como capa de caché
- Conocer las estructuras de datos principales: string, hash, list, set
- Configurar una instancia de Redis con **ioredis** en TypeScript
- Aplicar TTL (Time To Live) para expiración automática de claves

---

## 1. ¿Qué es Redis?

Redis (Remote Dictionary Server) es una base de datos in-memory de clave-valor.
A diferencia de PostgreSQL, almacena los datos en RAM, lo que permite
tiempos de respuesta de **0.1 a 2 ms** frente a los 5–200 ms de una consulta
a disco.

```
Request → Express → Redis (¿existe la clave?) → SÍ: devuelve datos (~1ms)
                                               → NO: consulta DB (~50ms) → guarda en Redis
```

### ¿Cuándo usar Redis?

| Caso de uso | Descripción |
|-------------|-------------|
| Caché de respuestas | Guardar JSON de endpoints que cambian poco |
| Sesiones / tokens | Almacenar refresh tokens o datos de sesión |
| Rate limiting | Contadores por IP con TTL automático |
| Pub/Sub | Canal de mensajes entre servicios (escala horizontal) |
| Colas | Procesamiento asíncrono con LPOP/RPUSH |

---

## 2. Estructuras de datos principales

### String — caché de JSON

La estructura más usada para caché de API. Permite guardar cualquier texto,
incluyendo JSON serializado.

```typescript
// Guardar con TTL de 60 segundos
await redis.set('products:all', JSON.stringify(data), 'EX', 60);

// Leer
const cached = await redis.get('products:all');
const data = cached ? JSON.parse(cached) : null;

// Eliminar
await redis.del('products:all');
```

### Hash — objeto con campos individuales

Útil cuando quieres actualizar un campo sin reescribir todo el objeto.

```typescript
await redis.hset('user:42', 'name', 'Ana', 'email', 'ana@example.com');
const name = await redis.hget('user:42', 'name');
const all = await redis.hgetall('user:42'); // { name: 'Ana', email: '...' }
```

### List — cola FIFO

```typescript
await redis.rpush('email:queue', JSON.stringify(job)); // encolar
const job = await redis.lpop('email:queue');           // desencolar
```

### Set — colección de únicos

```typescript
await redis.sadd('online:room:1', userId);   // agregar
await redis.srem('online:room:1', userId);   // quitar
const members = await redis.smembers('online:room:1');
```

---

## 3. TTL (Time To Live)

El TTL define cuántos segundos antes de que Redis elimine la clave automáticamente.
Sin TTL, la clave persiste hasta que la borres o reinicies Redis.

```typescript
// Opciones para SET con TTL
await redis.set('key', 'value', 'EX', 60);   // segundos
await redis.set('key', 'value', 'PX', 5000); // milisegundos

// Verificar tiempo restante
const ttl = await redis.ttl('key'); // -1 = sin TTL, -2 = no existe

// Extender TTL de una clave existente
await redis.expire('key', 120);
```

### TTL recomendados por tipo de dato

| Tipo de dato | TTL sugerido | Justificación |
|--------------|-------------|---------------|
| Listados de productos | 5 min | Cambian poco, alto tráfico |
| Detalle de un recurso | 2 min | Más específico, puede cambiar más |
| Datos de usuario | 1 min | Datos personales, más volátiles |
| Resultados de búsqueda | 30 s | Pueden variar con nuevos registros |

---

## 4. Configurar ioredis en TypeScript

```bash
pnpm add ioredis@5.6.1
pnpm add -D @types/node@22.15.3
```

```typescript
// src/lib/redis.ts
import Redis from 'ioredis';
import { env } from '../config/env';

export const redis = new Redis(env.REDIS_URL, {
  // Intentos de reconexión con backoff
  maxRetriesPerRequest: 3,
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  // No conectar hasta el primer uso
  lazyConnect: true,
});

redis.on('connect', () => console.log('✅ Redis conectado'));
redis.on('error', (err) => console.error('❌ Redis error:', err.message));
```

```typescript
// src/config/env.ts (fragmento)
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  REDIS_URL: z.string().url(),
  DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

---

## 5. Convención de nombres de claves

Una clave bien nombrada ayuda a invalidar con patrones:

```
recurso:variante:parámetro

productos:all:p1:l20     → todos los productos, página 1, límite 20
productos:id:42          → producto con ID 42
usuarios:id:7:perfil     → perfil del usuario 7
categorias:all           → todas las categorías
```

Para invalidar todo lo relacionado con productos:
```typescript
const keys = await redis.keys('productos:*');
if (keys.length) await redis.unlink(...keys); // unlink es async, no bloquea
```

---

## ✅ Checklist de verificación

- [ ] Redis corriendo localmente (`docker run -p 6379:6379 redis:7-alpine`)
- [ ] `ioredis` instalado y conectado sin errores
- [ ] `REDIS_URL=redis://localhost:6379` en `.env`
- [ ] `redis.set` con `EX` (TTL) en al menos un caso
- [ ] `redis.get` con `JSON.parse` para recuperar objetos

---

## 📚 Recursos adicionales

- [ioredis docs](https://github.com/redis/ioredis)
- [Redis commands reference](https://redis.io/commands/)
- [Redis data types](https://redis.io/docs/data-types/)
