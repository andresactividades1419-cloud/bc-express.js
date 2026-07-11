# 💻 Setup nativo (sin Docker)

Usa esta ruta solo si ya tienes o prefieres administrar PostgreSQL/MongoDB/Redis
instalados directamente en tu sistema. Si no estás seguro, usa
[la ruta con Docker](con-docker.md) — es más consistente entre máquinas.

## 1. Node.js 22+ y pnpm

```bash
nvm install 22
nvm use           # lee .nvmrc en la raíz del repo
corepack enable
corepack prepare pnpm@10.34.5 --activate
node --version    # v22.x
pnpm --version    # 10.34.5
```

No uses `npm`/`npx`/`yarn` en ningún `starter/` — todos declaran
`"packageManager": "pnpm@10.34.5"` y las instrucciones de cada semana asumen pnpm.

## 2. Bases de datos por semana

Instala solo lo que la semana que estás cursando requiera (ver tabla en
[`README.md`](README.md)):

**PostgreSQL 16+** (semanas 05, 16)

- Linux (Debian/Ubuntu): `sudo apt install postgresql-16`
- Mac: `brew install postgresql@16 && brew services start postgresql@16`
- Crea la DB: `createdb appdb` y ajusta `DATABASE_URL` en `.env`.
- Alternativa sin instalar nada: un tier gratuito en [Neon](https://neon.tech) o
  [Supabase](https://supabase.com) — usa la `DATABASE_URL` que te den.

**MongoDB 7+** (semana 06)

- Linux/Mac: sigue la [guía oficial de instalación](https://www.mongodb.com/docs/manual/administration/install-community/).
- Alternativa sin instalar nada: tier gratuito de
  [MongoDB Atlas](https://www.mongodb.com/atlas) — usa el `MONGODB_URI` que te den.

**Redis 7+** (semanas 12, 16)

- Linux: `sudo apt install redis-server && sudo systemctl start redis-server`
- Mac: `brew install redis && brew services start redis`
- Alternativa sin instalar nada: tier gratuito de [Upstash](https://upstash.com) —
  usa el `REDIS_URL` que te den.

## 3. Instalar dependencias de un ejercicio/proyecto

Cada `starter/` es un proyecto independiente:

```bash
cd bootcamp/week-05-postgresql_prisma/2-practicas/ejercicio-01-prisma-setup/starter
pnpm install
cp .env.example .env   # ajusta DATABASE_URL / MONGODB_URI / REDIS_URL según la semana
pnpm dev
```

## Semana 14 (Docker)

Esa semana enseña Docker como tema — necesitarás instalarlo igual llegado ese
punto, independientemente de qué ruta hayas seguido antes (ver
[con-docker.md](con-docker.md), sección "Instalar Docker").
