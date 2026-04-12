# 🌐 Webgrafía — Semana 12: Caching y Performance

## Redis y ioredis

| Recurso | Descripción |
|---------|-------------|
| [redis.io/docs](https://redis.io/docs/latest/) | Documentación oficial de Redis: comandos, estructuras de datos, configuración |
| [redis.io/docs/manual/eviction](https://redis.io/docs/latest/develop/reference/eviction/) | Políticas de eviction: LRU, LFU, TTL |
| [github.com/redis/ioredis](https://github.com/redis/ioredis) | Repositorio oficial de ioredis con ejemplos y API completa |
| [npm: ioredis](https://www.npmjs.com/package/ioredis) | Página npm con versiones, estadísticas de uso y README |

## Paginación

| Recurso | Descripción |
|---------|-------------|
| [Prisma — Pagination](https://www.prisma.io/docs/orm/prisma-client/queries/pagination) | Documentación oficial de Prisma sobre cursor y offset pagination |
| [Use the index, Luke — No offset](https://use-the-index-luke.com/no-offset) | Artículo técnico profundo sobre por qué OFFSET es ineficiente en SQL |
| [Slack Engineering — Evolving API Pagination](https://slack.engineering/evolving-api-pagination-at-slack/) | Cómo Slack migró de offset a cursor pagination en producción |

## Compresión y HTTP Cache

| Recurso | Descripción |
|---------|-------------|
| [npm: compression](https://www.npmjs.com/package/compression) | Documentación del middleware Express con opciones de configuración |
| [MDN — Cache-Control](https://developer.mozilla.org/docs/Web/HTTP/Headers/Cache-Control) | Referencia completa del header Cache-Control con ejemplos |
| [MDN — ETag](https://developer.mozilla.org/docs/Web/HTTP/Headers/ETag) | Cómo funcionan los ETags y las respuestas condicionales |
| [web.dev — Compression](https://web.dev/articles/codelab-text-compression) | Guía práctica de compresión para producción |

## Performance y benchmarking

| Recurso | Descripción |
|---------|-------------|
| [npm: response-time](https://www.npmjs.com/package/response-time) | Middleware `X-Response-Time` para Express |
| [ApacheBench manual](https://httpd.apache.org/docs/2.4/programs/ab.html) | Referencia del comando `ab` para benchmarks HTTP |
| [clinic.js](https://clinicjs.org/) | Herramienta de profiling para Node.js: CPU, memoria, async I/O |
