# 🚀 Proyecto Semanal: Dockerizando tu API REST

## 🎯 Objetivo

Contenerizar la API de tu dominio asignado con un `Dockerfile` multi-stage
y orquestar todos sus servicios con `docker-compose`, siguiendo las mejores
prácticas de seguridad y eficiencia de imágenes.

---

## 📋 Tu Dominio Asignado

**Dominio**: El instructor te asignará tu dominio específico.
Adapta los modelos y rutas a tu contexto (ver ejemplos al final del README).

---

## 🛠️ Setup del starter

```bash
cd starter
pnpm install
cp .env.example .env
# Edita .env con tus valores
pnpm prisma migrate dev --name init
pnpm dev
# Verifica: GET http://localhost:3000/health
```

---

## 📋 Tareas

### TODO 1 — Completar `prisma/schema.prisma`

Adapta el modelo genérico `Resource` a tu dominio:
- Renombre el modelo con el nombre de tu entidad principal
- Agrega los campos relevantes para tu dominio

### TODO 2 — Completar el `Dockerfile` multi-stage

Abre `starter/Dockerfile` y completa las secciones marcadas con `TODO`.

El Dockerfile debe tener:
- **Stage `builder`**: `node:22-alpine`, pnpm vía corepack, `pnpm install --frozen-lockfile`, `pnpm prisma generate`, `pnpm build`
- **Stage `production`**: imagen fresca, copia `dist/` + `prisma/` + lock file, `pnpm install --prod --frozen-lockfile`, `pnpm prisma generate`, `USER node`, `HEALTHCHECK`, `CMD`

### TODO 3 — Completar `docker-compose.yml`

Abre `starter/docker-compose.yml` y completa las secciones `TODO`.

El docker-compose debe tener:
- Servicio `app` con build, ports, env_file, depends_on postgres (healthy)
- Servicio `postgres:16-alpine` con healthcheck `pg_isready`
- Named volume `pg_data` para persistencia de la base de datos
- Red interna `app_network`

### TODO 4 — Configurar `.env.docker`

Crea el archivo `.env.docker` a partir de `.env.docker.example`.
Recuerda usar el hostname `postgres` (nombre del servicio) en `DATABASE_URL`.

---

## 💡 Ejemplos de Adaptación por Dominio

| Dominio | Modelo principal | Campos sugeridos |
|---------|-----------------|-----------------|
| 📖 Biblioteca | `Book` | title, author, isbn, available |
| 💊 Farmacia | `Medicine` | name, stock, price, expiresAt |
| 🏋️ Gimnasio | `Member` | name, email, plan, active |
| 🍽️ Restaurante | `Dish` | name, price, category, available |
| 🏦 Banco | `Account` | number, owner, balance, type |

---

## ✅ Entregables

1. `docker build --tag mi-api .` sin errores
2. Imagen de producción pesa ≤ 200 MB (screenshot de `docker images`)
3. `docker compose up --build` levanta API + PostgreSQL sin errores
4. `GET http://localhost:3000/health` retorna `{ status: "ok", db: "connected" }`
5. CRUD del endpoint principal funcional (mínimo GET y POST con screenshots)
6. Los datos persisten tras `docker compose down && docker compose up`
7. Las credenciales están en `.env.docker`, no hardcodeadas en el YAML

---

## 🔗 Recursos

- [Semana 14 — Teoría Docker](../../1-teoria)
- [Ejercicio 01 — Dockerfile](../../2-practicas/ejercicio-01-dockerfile)
- [Ejercicio 02 — docker-compose](../../2-practicas/ejercicio-02-docker-compose)
