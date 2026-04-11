# Webgrafía — Semana 05: PostgreSQL y Prisma

## 🌐 Documentación Oficial

| Recurso | URL | Descripción |
|---------|-----|-------------|
| Prisma Docs | https://www.prisma.io/docs | Referencia completa: schema, migraciones, CRUD, relaciones, errores |
| Prisma Schema Reference | https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference | Todos los tipos, modificadores y directivas del schema |
| Prisma Client API | https://www.prisma.io/docs/reference/api-reference/prisma-client-reference | Documentación de todos los métodos: findMany, create, update, etc. |
| PostgreSQL Docs | https://www.postgresql.org/docs/16/ | Documentación oficial de PostgreSQL 16 |
| Docker Hub postgres | https://hub.docker.com/_/postgres | Imagen oficial de PostgreSQL para Docker |

## 🔧 Herramientas

| Herramienta | URL | Descripción |
|-------------|-----|-------------|
| Prisma Studio | Ejecutar `pnpm dlx prisma studio` | GUI para explorar y editar datos en la BD |
| TablePlus | https://tableplus.com/ | Cliente GUI gratuito para PostgreSQL (alternativa a Prisma Studio) |
| DBeaver | https://dbeaver.io/ | Cliente SQL universal, open source |

## 📚 Artículos Recomendados

| Artículo | URL | Tema |
|----------|-----|------|
| Prisma vs TypeORM | https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm | Comparativa técnica de ORMs |
| Connection Management | https://www.prisma.io/docs/guides/performance-and-optimization/connection-management | Por qué usar singleton en desarrollo |
| Prisma Error Reference | https://www.prisma.io/docs/reference/api-reference/error-reference | Todos los códigos de error (Pxxxx) con descripción |
| N+1 Problem | https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance | Cómo evita Prisma el problema N+1 con include |
| Database Relations | https://www.prisma.io/dataguide/types/relational/intro-to-table-relationships | Guía de relaciones relacionales (1:1, 1:N, N:M) |

## 🐳 Docker

| Recurso | URL |
|---------|-----|
| Docker Compose reference | https://docs.docker.com/compose/compose-file/ |
| postgres image variants | https://hub.docker.com/_/postgres#image-variants |

## 🔐 Seguridad

| Recurso | URL | Descripción |
|---------|-----|-------------|
| OWASP SQL Injection | https://owasp.org/www-community/attacks/SQL_Injection | Por qué los ORMs como Prisma previenen inyección SQL |
| Prisma parameterized queries | https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access | Cómo Prisma parametriza queries para evitar SQLi |
