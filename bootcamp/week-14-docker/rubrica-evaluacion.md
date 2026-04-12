# Rúbrica de Evaluación — Semana 14: Docker

## 🧠 Evaluación de Conocimiento (30%)

Responde las siguientes preguntas sin apoyarte en el material:

1. ¿Cuál es la diferencia entre una imagen Docker y un contenedor?
2. ¿Qué instrucción de Dockerfile establece el directorio de trabajo?
3. ¿Por qué order importa en el Dockerfile cuando se trata de layer caching?
4. ¿Qué ventaja tiene un multi-stage build sobre un Dockerfile de un solo stage?
5. ¿Qué instrucción copia artefactos de un stage anterior en el mismo Dockerfile?
6. ¿Para qué sirve `.dockerignore` y qué archivos siempre debe excluir?
7. ¿Cuál es la diferencia entre `ARG` y `ENV` en un Dockerfile?
8. ¿Qué hace `depends_on: condition: service_healthy` en docker-compose?
9. ¿Por qué no se debe ejecutar el proceso Node.js como `root` en producción?
10. ¿Qué es un named volume y cómo evita perder datos de PostgreSQL al reiniciar?

---

## 💪 Rúbrica — Ejercicio 01: Dockerfile

### PASO 1 — Dockerfile single-stage

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Dockerfile correcto, `node:22-alpine`, pnpm, build y CMD; imagen construye y arranca | 4 |
| Bueno | Dockerfile funcional con 1-2 pequeños problemas (ej.: falta EXPOSE u orden no óptimo) | 3 |
| Suficiente | Imagen construye pero el servidor no arranca correctamente | 2 |
| Insuficiente | No compila o Dockerfile incompleto | 0-1 |

### PASO 2 — .dockerignore

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Excluye `node_modules`, `dist`, `.env`, `.git`, archivos TS fuente en prod | 4 |
| Bueno | Excluye `node_modules` y `.env` correctamente | 3 |
| Suficiente | Archivo existe pero incompleto (falta `.env` o `dist`) | 2 |
| Insuficiente | No existe o está vacío | 0-1 |

### PASO 3 — Multi-stage Dockerfile

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Stage `builder` + stage `production`, imagen final ≤ 200 MB, `USER node` | 4 |
| Bueno | Multi-stage funcional, imagen correcta pero sin USER non-root | 3 |
| Suficiente | Multi-stage construye pero copia archivos innecesarios (ej.: node_modules completo) | 2 |
| Insuficiente | Single-stage sin cambios o no compila | 0-1 |

### PASO 4 — Verificación

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Captura de `docker images` con ambas etapas y diferencia de tamaño visible | 4 |
| Bueno | La API responde en `/health` desde el contenedor | 3 |
| Suficiente | El contenedor corre pero el endpoint no responde correctamente | 2 |
| Insuficiente | No hay evidencia de dockerización | 0-1 |

---

## 💪 Rúbrica — Ejercicio 02: docker-compose

### PASO 1 — Servicio PostgreSQL con health check

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Servicio `postgres`, imagen oficial, variables de entorno, `healthcheck` con `pg_isready` | 4 |
| Bueno | Postgres levanta correctamente, healthcheck incompleto | 3 |
| Suficiente | Postgres levanta pero sin healthcheck ni persistencia | 2 |
| Insuficiente | Postgres no levanta | 0-1 |

### PASO 2 — Servicio app con depends_on

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | `depends_on` con `condition: service_healthy`, `DATABASE_URL` con hostname del servicio | 4 |
| Bueno | App espera a postgres pero con `depends_on` simple (no service_healthy) | 3 |
| Suficiente | App levanta pero falla la conexión a la base de datos | 2 |
| Insuficiente | App no levanta o no se comunica con postgres | 0-1 |

### PASO 3 — Volúmenes para persistencia

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | Named volume declarado y montado en `/var/lib/postgresql/data`; datos persisten al re-crear | 4 |
| Bueno | Volume existe y monta pero no está en la sección `volumes:` raíz | 3 |
| Suficiente | Volume montado con ruta host (bind mount) en lugar de named volume | 2 |
| Insuficiente | Sin volumen — datos se pierden al reiniciar | 0-1 |

### PASO 4 — Variables de entorno con .env

| Nivel | Descripción | Puntos |
|-------|-------------|--------|
| Excelente | `env_file: - .env` en el servicio app, `.env` nunca commiteado, `.env.example` presente | 4 |
| Bueno | Variables en `environment:` pero referenciadas desde `.env` del host | 3 |
| Suficiente | Variables hardcodeadas en docker-compose.yml | 2 |
| Insuficiente | Variables de entorno no configuradas | 0-1 |

---

## 📦 Criterios de Producto Semanal (100 puntos)

| Criterio | Descripción | Pts |
|----------|-------------|-----|
| Dockerfile multi-stage funcional | `docker build` sin errores, imagen ≤ 200 MB | 20 |
| USER non-root en producción | Stage final usa `USER node` o usuario no privilegiado | 10 |
| `.dockerignore` completo | Excluye `node_modules`, `.env`, `.git`, archivos TS fuente | 10 |
| `docker-compose.yml` válido | `docker compose up` levanta todos los servicios sin error | 20 |
| Health check en PostgreSQL | Servicio postgres tiene `healthcheck` con `pg_isready` | 10 |
| `depends_on` con condición | App espera postgres healthy antes de arrancar | 10 |
| Named volumes para persistencia | Datos de DB sobreviven `docker compose down` + `up` | 10 |
| Variables de entorno seguras | Secretos en `.env` (no commiteado), `.env.example` presente | 10 |
| **Total** | | **100** |

---

## ✅ Tabla de Aprobación

| Tipo | Mínimo | Peso |
|------|--------|------|
| Conocimiento 🧠 | 70% (7/10 correctas) | 30% |
| Desempeño 💪 | 70% (22/32 puntos ejercicios) | 40% |
| Producto 📦 | 70% (70/100 puntos) | 30% |
