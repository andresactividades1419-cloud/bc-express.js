# 🛠️ Setup del entorno

Este bootcamp tiene 46 proyectos independientes (`starter/` por semana/ejercicio),
cada uno con su propio `package.json` pineado. No hay un único comando de arranque
para todo el repo — cada `starter/` se instala y ejecuta por separado.

Hay dos formas de tener el entorno de bases de datos (PostgreSQL, MongoDB, Redis)
que algunas semanas requieren. Elige una:

| | [Con Docker](con-docker.md) | [Sin Docker](sin-docker.md) |
|---|---|---|
| Recomendado para | La mayoría de estudiantes | Quien ya tiene Postgres/Mongo/Redis nativos instalados |
| Setup inicial | Un poco más largo (instalar Docker) | Más rápido si ya tienes las DB corriendo |
| Consistencia | Igual en cualquier máquina (Linux/Mac/Windows) | Depende de tu instalación local |
| Requiere | Docker Desktop o Docker Engine + Compose | PostgreSQL 16+, MongoDB 7+, Redis 7+ instalados nativamente |

**Regla simple**: si no sabes cuál elegir, usa [Docker](con-docker.md) — es la
misma ruta que se enseña formalmente en la semana 14 (Docker) y evita problemas de
"funciona en mi máquina".

## Qué es común a ambas rutas

- **Node.js 22+** (usa [nvm](https://github.com/nvm-sh/nvm), hay `.nvmrc` en la
  raíz del repo — `nvm use` lo detecta automático).
- **pnpm 10.x** como único gestor de paquetes — nunca `npm`/`yarn`. Actívalo con
  Corepack: `corepack enable && corepack prepare pnpm@10.34.5 --activate`. Cada
  `package.json` declara `"packageManager": "pnpm@10.34.5"`, así que Corepack lo
  fuerza automáticamente si está habilitado.
- Instalación por proyecto: `cd bootcamp/week-XX-.../.../starter && pnpm install`.

## Qué semana necesita qué servicio externo

| Semana | Servicio | Notas |
|---|---|---|
| 05 — PostgreSQL + Prisma | PostgreSQL 16 | `DATABASE_URL` en `.env` |
| 06 — MongoDB + Mongoose | MongoDB 7 | `MONGODB_URI` en `.env` |
| 10 — Uploads/Emails | Ninguno obligatorio (Cloudinary/SMTP son servicios externos gratuitos, no locales) | |
| 11 — WebSockets | Ninguno (Socket.io corre embebido en el proceso Express) | |
| 12 — Caching | Redis 7 | `REDIS_URL` en `.env` |
| 14 — Docker | Docker mismo (tema de la semana) | |
| 16 — Proyecto final | PostgreSQL + Redis (integra lo anterior) | |

Todas las demás semanas (01-04, 07-09, 13, 15) no requieren ningún servicio
externo — solo Node.js y `pnpm install`.
