# Docker Compose

## 🎯 Objetivos

- Orquestar múltiples servicios con un solo comando
- Configurar PostgreSQL y Redis junto a la API
- Manejar variables de entorno, volúmenes y health checks en Compose

---

## 1. ¿Por qué docker-compose?

Manejar contenedores individualmente con `docker run` se complica rápido:

```bash
# Sin compose: arrancar 3 servicios manualmente
docker run -d --name postgres -e POSTGRES_PASSWORD=pass postgres:16-alpine
docker run -d --name redis redis:7-alpine
docker run -d --name api -p 3000:3000 --link postgres --link redis mi-api

# Con compose: un solo comando
docker compose up
```

`docker-compose.yml` define todos los servicios, redes y volúmenes en un
archivo declarativo y versionable.

![Topología de servicios](../0-assets/03-compose-topology.svg)

---

## 2. Estructura de docker-compose.yml

```yaml
services:          # Cada servicio es un contenedor
  app:
    build: .       # Construir desde Dockerfile local
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:           # Volúmenes nombrados para persistencia
  pg_data:
```

---

## 3. variables de entorno y secretos

### Opción A: `environment:` inline (solo para desarrollo)

```yaml
services:
  app:
    environment:
      DATABASE_URL: postgresql://user:password@postgres:5432/mydb
      JWT_SECRET: dev_secret
```

### Opción B: `env_file:` (recomendado)

```yaml
services:
  app:
    env_file:
      - .env
```

El archivo `.env` vive en el mismo directorio que `docker-compose.yml`.
**Nunca lo commitas** — está en `.gitignore`. Solo commiteas `.env.example`.

```bash
# .env (no commiteado)
DATABASE_URL=postgresql://user:pass@postgres:5432/mydb
JWT_SECRET=super_secret_32_chars_minimum_length

# .env.example (commiteado — sin valores reales)
DATABASE_URL=postgresql://user:password@postgres:5432/mydb
JWT_SECRET=change_this_to_a_long_random_secret
```

### Importante: hostname de la base de datos en Compose

Dentro de la red de Compose, los servicios se referencian por su **nombre**.
El hostname de PostgreSQL es el nombre del servicio (`postgres`), no `localhost`:

```bash
# ❌ MAL (localhost es la app misma dentro del contenedor)
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

# ✅ BIEN (nombre del servicio en docker-compose.yml)
DATABASE_URL=postgresql://user:pass@postgres:5432/mydb
```

---

## 4. depends_on con health check

Sin health check, `depends_on` solo espera a que el contenedor **arranque**,
no a que **esté listo para recibir conexiones**.

```yaml
services:
  app:
    depends_on:
      postgres:
        condition: service_healthy   # ← espera a healthy, no solo started

  postgres:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
```

**Redis health check:**

```yaml
  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
```

---

## 5. Volúmenes para persistencia

```yaml
services:
  postgres:
    volumes:
      # Named volume — Docker gestiona la ubicación en el host
      - pg_data:/var/lib/postgresql/data

  redis:
    volumes:
      - redis_data:/data

# OBLIGATORIO declarar los volumes nombrados en la raíz
volumes:
  pg_data:
  redis_data:
```

Sin volumen, al hacer `docker compose down` y `docker compose up` de nuevo,
**la base de datos empieza vacía**.

---

## 6. Comandos esenciales de Compose

```bash
# Arrancar todos los servicios (build si hace falta)
docker compose up

# En background
docker compose up -d

# Forzar reconstrucción de las imágenes
docker compose up --build

# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f app

# Ver estado de los servicios
docker compose ps

# Ejecutar un comando en un servicio corriendo
docker compose exec app sh
docker compose exec postgres psql -U user -d mydb

# Detener y eliminar contenedores + red
docker compose down

# Detener + eliminar contenedores, red Y volúmenes
docker compose down -v
```

---

## 7. Ejecutar migraciones de Prisma

```yaml
# Opción: command en app para migrar antes de arrancar
services:
  app:
    command: sh -c "pnpm prisma migrate deploy && node dist/server.js"
    depends_on:
      postgres:
        condition: service_healthy
```

---

## ✅ Checklist de Verificación

- [ ] `docker compose up` levanta todos los servicios sin errores
- [ ] El app espera a PostgreSQL con `condition: service_healthy`
- [ ] Los volumes nombrados están declarados en la sección `volumes:` raíz
- [ ] Las credenciales vienen de `env_file: .env`, no hardcodeadas en el YAML
- [ ] `DATABASE_URL` usa el hostname del servicio, no `localhost`
- [ ] `docker compose down && docker compose up` mantiene los datos de la DB
