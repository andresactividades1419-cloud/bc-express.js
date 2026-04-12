# Semana 12: Caching y Performance

Redis, paginación eficiente y compresión HTTP. Esta semana aprenderás a reducir
latencia y carga en tu API con caché in-memory, a diseñar paginación escalable
con cursores y a aplicar compresión para minimizar el ancho de banda.

---

## 🎯 Objetivos de aprendizaje

Al finalizar esta semana serás capaz de:

- Explicar qué es Redis y cuándo usarlo como capa de caché
- Conectar Node.js a Redis usando **ioredis**
- Implementar un middleware de caché HTTP genérico sobre Express
- Invalidar caché selectivamente cuando los datos cambian
- Diseñar paginación basada en **cursor** (escalable) y **offset** (simple)
- Aplicar compresión **gzip/brotli** con el middleware `compression`
- Medir el impacto de la caché midiendo tiempos de respuesta con ApacheBench o k6

---

## 📚 Requisitos previos

| Semana | Tema | Conceptos necesarios |
|--------|------|----------------------|
| Semana 03 | REST API | Arquitectura en capas, controladores, servicios |
| Semana 05 | PostgreSQL + Prisma | Queries, modelos, relaciones |

---

## 🗂️ Estructura de la semana

```
week-12-caching_performance/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-cache-layers.svg
│   ├── 02-cursor-pagination.svg
│   └── 03-redis-patterns.svg
├── 1-teoria/
│   ├── 01-redis-fundamentos.md
│   ├── 02-cache-express.md
│   ├── 03-paginacion-eficiente.md
│   └── 04-compresion-performance.md
├── 2-practicas/
│   ├── ejercicio-01-cache-redis/
│   └── ejercicio-02-paginacion-cursor/
├── 3-proyecto/
│   ├── README.md
│   └── starter/
├── 4-recursos/
│   ├── ebook-free/
│   ├── videografia/
│   └── webgrafia/
└── 5-glosario/
    └── README.md
```

---

## 📝 Contenidos

### 1-teoria/

| Archivo | Tema |
|---------|------|
| [01-redis-fundamentos.md](1-teoria/01-redis-fundamentos.md) | Redis: instalación, estructuras de datos, TTL, ioredis |
| [02-cache-express.md](1-teoria/02-cache-express.md) | Middleware de caché, estrategias (cache-aside, write-through), invalidación |
| [03-paginacion-eficiente.md](1-teoria/03-paginacion-eficiente.md) | Offset vs cursor pagination, cursor con Prisma, metadatos |
| [04-compresion-performance.md](1-teoria/04-compresion-performance.md) | `compression` middleware, gzip/brotli, ETags, medición de performance |

### 2-practicas/

| Ejercicio | Descripción |
|-----------|-------------|
| [ejercicio-01-cache-redis](2-practicas/ejercicio-01-cache-redis/README.md) | Middleware de caché con Redis: get/set/del, TTL, invalidación |
| [ejercicio-02-paginacion-cursor](2-practicas/ejercicio-02-paginacion-cursor/README.md) | Paginación por cursor con Prisma + metadatos `hasNextPage` |

---

## ⏱️ Distribución del tiempo (8 horas)

| Actividad | Tiempo |
|-----------|--------|
| Teoría: Redis, caché, paginación, compresión | 2 h |
| Ejercicio 01: Middleware de caché con Redis | 1.5 h |
| Ejercicio 02: Paginación por cursor con Prisma | 1.5 h |
| Proyecto semanal: API con caché y paginación eficiente | 3 h |

---

## 📌 Entregables

1. **Ejercicio 01** completado: middleware de caché funcional con Redis
2. **Ejercicio 02** completado: paginación por cursor con `hasNextPage` y `nextCursor`
3. **Proyecto semanal**: API aplicada al dominio asignado con caché, paginación eficiente y compresión

---

## 🔗 Navegación

← [Semana 11: WebSockets](../week-11-websockets/README.md) &nbsp;|&nbsp; [Semana 13: OpenAPI/Swagger](../week-13-openapi_swagger/README.md) →
