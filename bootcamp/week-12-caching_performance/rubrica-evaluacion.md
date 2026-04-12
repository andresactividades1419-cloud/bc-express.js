# Rúbrica de Evaluación — Semana 12: Caching y Performance

---

## 🧠 Conocimiento (30%) — Evaluación teórica

### Preguntas clave

1. ¿Qué es Redis y en qué se diferencia de una base de datos relacional como PostgreSQL?
2. ¿Qué significa TTL en el contexto de caché y cómo se configura en Redis con ioredis?
3. Explica la estrategia de caché **cache-aside** (lazy loading). ¿Cuándo se llena la caché?
4. ¿Qué es la invalidación de caché y por qué es uno de los problemas más difíciles en sistemas distribuidos?
5. ¿Cuáles son las desventajas de la paginación por offset (`LIMIT/OFFSET`) a gran escala?
6. ¿Cómo funciona la paginación por cursor? ¿Qué campo se usa como cursor habitualmente?
7. ¿Qué hace el middleware `compression` en Express? ¿Qué algoritmos soporta?
8. ¿Cuándo conviene NO cachear una respuesta de API?
9. ¿Qué es un ETag HTTP y cómo se relaciona con la caché del navegador?
10. ¿Qué estructuras de datos ofrece Redis además de strings? Da un ejemplo de uso para cada una.

### Criterios de evaluación

| Criterio | Excelente (3) | Satisfactorio (2) | Insuficiente (1) |
|----------|--------------|-------------------|------------------|
| Conceptos Redis | Explica estructuras, TTL y persistencia con precisión | Explica conceptos básicos con pequeñas imprecisiones | Confunde Redis con una base de datos convencional |
| Estrategias de caché | Distingue cache-aside, write-through e invalidación | Explica cache-aside correctamente | No comprende la diferencia entre estrategias |
| Paginación | Explica ventajas de cursor vs offset con ejemplos | Explica la diferencia sin ejemplos concretos | No distingue ambos enfoques |
| Performance | Comprende compresión, ETags y medición | Conoce qué hace `compression` | No conecta compresión con performance |

---

## 💪 Desempeño (40%) — Ejercicios prácticos

### Ejercicio 01: Middleware de caché con Redis

| Criterio | Excelente (4) | Satisfactorio (3) | Básico (2) | Insuficiente (1) |
|----------|--------------|-------------------|------------|------------------|
| Conexión a Redis | Conecta correctamente con ioredis y maneja desconexiones | Conecta sin error handling | Conecta sin TTL | No conecta |
| Middleware GET | Verifica caché antes de llegar al controlador, retorna hit correcto | Funciona sin manejar errores Redis | Funciona solo parcialmente | No implementado |
| Set en caché | Guarda respuesta con TTL correcto tras miss | Guarda sin TTL | Guarda mal el valor | No implementado |
| Invalidación DELETE | Elimina clave correcta al mutar datos | Elimina parcialmente | No invalida | No implementado |

### Ejercicio 02: Paginación por cursor

| Criterio | Excelente (4) | Satisfactorio (3) | Básico (2) | Insuficiente (1) |
|----------|--------------|-------------------|------------|------------------|
| Query cursor | Usa `cursor` + `take` en Prisma correctamente | Funciona pero cursor mal tipado | Usa offset en vez de cursor | No implementado |
| `hasNextPage` | Calcula correctamente (toma N+1 y verifica) | Hardcodeado o incorrecto | Ausente en respuesta | No implementado |
| `nextCursor` | Retorna el ID/campo correcto del último item | Funciona en casos mayoritarios | Devuelve valor incorrecto | No implementado |
| Validación query params | Valida `limit` y `cursor` con Zod | Valida solo `limit` | Sin validación | No implementado |

---

## 📦 Producto (30%) — Proyecto semanal integrador

### Criterios de evaluación (100 puntos)

| Criterio | Puntos | Descripción |
|----------|--------|-------------|
| Conexión Redis funcional | 10 | ioredis conecta a Redis; reconexión automática; sin credenciales hardcodeadas |
| Middleware de caché implementado | 15 | GET cachea respuesta; miss → BD → Redis; hit → respuesta directa |
| TTL configurado correctamente | 5 | TTL distinto para endpoints con diferente volatilidad |
| Invalidación de caché | 10 | POST/PUT/DELETE invalidan claves afectadas |
| Paginación por cursor | 15 | `cursor`, `limit`, `hasNextPage`, `nextCursor` en respuesta |
| Paginación por offset | 5 | Al menos un endpoint con offset (lista corta o admin) |
| Compresión habilitada | 5 | `compression` middleware activo y verificable con `Content-Encoding: gzip` |
| Variables de entorno | 5 | `REDIS_URL`, `PORT`, `DATABASE_URL` en `.env.example` |
| Dominio coherente | 10 | Recursos adaptados al dominio asignado con nombres descriptivos |
| TypeScript sin errores | 10 | Compila sin errores con `tsc --noEmit` |
| Código limpio y estructura | 10 | Capas separadas (routes → controllers → services → cache), sin lógica duplicada |

### Tabla de aprobación

| Puntos | Resultado |
|--------|-----------|
| 90–100 | Excelente |
| 75–89  | Satisfactorio |
| 60–74  | Aprobado |
| < 60   | Requiere revisión |
