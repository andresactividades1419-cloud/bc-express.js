# Ejercicio 02 — docker-compose: API + PostgreSQL

Partirás de una API Express + Prisma (similar a semanas anteriores).
El Dockerfile ya está dado y funciona. Tu tarea es escribir el
`docker-compose.yml` para orquestar la API junto a PostgreSQL.

![Topología de servicios](../../0-assets/03-compose-topology.svg)

---

## 🛠️ Setup (sin Docker, para probar la API)

```bash
cd starter
pnpm install
cp .env.example .env
# Edita .env con tu DATABASE_URL local
pnpm prisma migrate dev --name init
pnpm dev
# Verifica: GET http://localhost:3000/health → { "status": "ok" }
```

---

## PASO 1 — Servicio postgres con health check

**Abre `starter/docker-compose.yml`** y descomenta el bloque del PASO 1.

El servicio debe:
- Usar la imagen `postgres:16-alpine`
- Configurar las variables `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- Tener un `healthcheck` con `pg_isready`
- Estar en la red `app_network`

Verifica que PostgreSQL levanta solo:
```bash
docker compose up postgres
# En otro terminal:
docker compose exec postgres psql -U pguser -d appdb -c '\l'
```

---

## PASO 2 — Servicio app con depends_on

**Abre `starter/docker-compose.yml`** y descomenta el bloque del PASO 2.

El servicio app debe:
- Construirse desde el `Dockerfile` local (`build: .`)
- Usar `env_file: - .env.docker`
- Depender de postgres con `condition: service_healthy`
- Exponer el puerto 3000

Verifica que los dos servicios arrancan correctamente:
```bash
docker compose up --build
# Espera a que aparezca "🚀 API en http://localhost:3000"
curl http://localhost:3000/health
```

Si la migración falla, verifica que `DATABASE_URL` en `.env.docker` usa
el hostname `postgres` (nombre del servicio), no `localhost`.

---

## PASO 3 — Volumes para persistencia

**Abre `starter/docker-compose.yml`** y descomenta el bloque del PASO 3.

Agrega:
- Un named volume `pg_data` montado en `/var/lib/postgresql/data`
- La sección `volumes:` al final del archivo

Verifica la persistencia:
```bash
# 1. Crear un registro
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarea persistente"}'

# 2. Reiniciar los servicios
docker compose down
docker compose up -d

# 3. Los datos deben seguir ahí
curl http://localhost:3000/api/v1/tasks
```

---

## PASO 4 — Migración automática con Prisma

**Abre `starter/docker-compose.yml`** y descomenta el bloque del PASO 4
en el servicio `app`.

Cambia el `command` del servicio para correr las migraciones antes de
arrancar el servidor:
```yaml
command: sh -c "pnpm prisma migrate deploy && node dist/server.js"
```

Verifica que `docker compose up` corre las migraciones automáticamente
sin necesidad de ejecutarlas manualmente.

---

## ✅ Criterios de éxito

- `docker compose up --build` levanta API + PostgreSQL sin errores
- La API se comunica con la base de datos (POST y GET de tareas funcionales)
- Los datos persisten después de `docker compose down` + `up`
- Las migraciones corren automáticamente al arrancar
- Las credenciales están en `.env.docker`, no hardcodeadas en el YAML
