# 🐳 Setup con Docker (recomendado)

## 1. Instalar Docker

- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/) + plugin Compose (`docker compose version` debe funcionar).
- **Mac/Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Verifica:

```bash
docker --version
docker compose version
```

## 2. Node.js y pnpm (igual que en la ruta nativa)

Aunque las bases de datos corran en Docker, el código de cada `starter/` sigue
corriendo en tu máquina con Node.js — Docker aquí resuelve solo los servicios
externos (Postgres/Mongo/Redis), no reemplaza tu entorno de desarrollo hasta la
semana 14.

```bash
nvm use          # usa el Node.js declarado en .nvmrc (22+)
corepack enable
corepack prepare pnpm@10.34.5 --activate
```

## 3. Levantar los servicios que tu semana actual necesita

No hay un `docker-compose.yml` único para todo el bootcamp — cada semana que
necesita una base de datos la levanta con un contenedor suelto (más simple que
mantener un compose global sincronizado con 46 proyectos). Usa el que corresponda:

**PostgreSQL** (semanas 05, 16):

```bash
docker run -d --name bc-postgres \
  -e POSTGRES_USER=pguser -e POSTGRES_PASSWORD=pgpassword -e POSTGRES_DB=appdb \
  -p 5432:5432 -v bc-postgres-data:/var/lib/postgresql/data \
  postgres:16-alpine
```

`DATABASE_URL=postgresql://pguser:pgpassword@localhost:5432/appdb`

**MongoDB** (semana 06):

```bash
docker run -d --name bc-mongo \
  -p 27017:27017 -v bc-mongo-data:/data/db \
  mongo:7
```

`MONGODB_URI=mongodb://localhost:27017/appdb`

**Redis** (semanas 12, 16):

```bash
docker run -d --name bc-redis -p 6379:6379 redis:7-alpine
```

`REDIS_URL=redis://localhost:6379`

Copia el `.env.example` de cada `starter/` a `.env` y ajusta esas URLs si aplica.

## 4. Semana 14 (Docker) es distinta

A partir de la semana 14, el objetivo es dockerizar la propia app (no solo las
bases de datos) — ahí usarás el `Dockerfile` y `docker-compose.yml` que se
construyen como parte del ejercicio (`bootcamp/week-14-docker/`). No necesitas
los contenedores sueltos de este documento para esa semana, el compose de la
semana ya orquesta app + DB.

## Apagar/limpiar

```bash
docker stop bc-postgres bc-mongo bc-redis
docker rm bc-postgres bc-mongo bc-redis
# agrega -v a docker rm (o borra los volumes bc-*-data) si quieres borrar los datos también
```
