# Semana 14 — Docker: Empaqueta y Desplega tu API

## 🎯 Objetivos de Aprendizaje

Al finalizar esta semana serás capaz de:

- ✅ Comprender la arquitectura de Docker: imágenes, contenedores y capas
- ✅ Escribir un `Dockerfile` para Node.js/TypeScript con buenas prácticas
- ✅ Implementar builds multi-stage para reducir el tamaño de la imagen de producción
- ✅ Usar `.dockerignore` para excluir archivos innecesarios de la imagen
- ✅ Orquestar múltiples servicios (API + PostgreSQL + Redis) con `docker-compose`
- ✅ Gestionar variables de entorno y secretos en contenedores de forma segura
- ✅ Verificar el estado de servicios con health checks

---

## 📚 Requisitos Previos

| Semana | Tema | Por qué es necesario |
|--------|------|----------------------|
| [Semana 01](../week-01-nodejs_fundamentals/) | Node.js + TypeScript | El proyecto a dockerizar usa TS con build step |
| [Semana 05](../week-05-postgresql_prisma/) | Prisma + PostgreSQL | docker-compose incluye servicio PostgreSQL |

---

## 🗂️ Estructura de la Semana

```
week-14-docker/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-docker-layers.svg           # Capas de una imagen Docker
│   ├── 02-multistage-build.svg        # Etapas builder vs production
│   └── 03-compose-topology.svg        # Topología docker-compose
├── 1-teoria/
│   ├── 01-docker-fundamentos.md       # Imágenes, contenedores, comandos básicos
│   ├── 02-dockerfile-nodejs.md        # Dockerfile para Node.js/TypeScript
│   ├── 03-multistage-builds.md        # Multi-stage: tamaño y seguridad
│   └── 04-docker-compose.md           # Orquestación multi-servicio
├── 2-practicas/
│   ├── ejercicio-01-dockerfile/       # Crear imagen de una API Express
│   └── ejercicio-02-docker-compose/   # API + PostgreSQL + Redis
├── 3-proyecto/                        # Dockerizar API completa del dominio
├── 4-recursos/
└── 5-glosario/
```

---

## 📝 Contenidos Teóricos

| Archivo | Tema | Tiempo |
|---------|------|--------|
| [01-docker-fundamentos.md](1-teoria/01-docker-fundamentos.md) | Imágenes, contenedores, capas, CLI | 30 min |
| [02-dockerfile-nodejs.md](1-teoria/02-dockerfile-nodejs.md) | Dockerfile, layer caching, .dockerignore | 30 min |
| [03-multistage-builds.md](1-teoria/03-multistage-builds.md) | Multi-stage, ARG/ENV, USER, HEALTHCHECK | 30 min |
| [04-docker-compose.md](1-teoria/04-docker-compose.md) | Servicios, redes, volúmenes, depends_on | 30 min |

---

## 🛠️ Prácticas

| Ejercicio | Descripción | Tiempo |
|-----------|-------------|--------|
| [ejercicio-01-dockerfile](2-practicas/ejercicio-01-dockerfile/) | Dockerfile single-stage y multi-stage para API Express | 1.5 h |
| [ejercicio-02-docker-compose](2-practicas/ejercicio-02-docker-compose/) | API + PostgreSQL orquestados con docker-compose | 1.5 h |

---

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Horas |
|-----------|-------|
| Teoría (4 archivos × 30 min) | 2 h |
| Ejercicio 01 — Dockerfile | 1.5 h |
| Ejercicio 02 — docker-compose | 1.5 h |
| Proyecto semanal | 3 h |
| **Total** | **8 h** |

---

## 📌 Entregables

1. **Imagen Docker funcional** — `docker build` sin errores, `docker run` responde en `/health`
2. **Multi-stage Dockerfile** — imagen de producción ≤ 200 MB
3. **docker-compose up** — API + PostgreSQL levantados, logs sin errores
4. **Capturas** de `docker images` (comparativa single vs multi-stage) y `docker-compose ps`

---

## 🔗 Navegación

← [Semana 13 — OpenAPI/Swagger](../week-13-openapi_swagger/) | [Semana 15 — CI/CD y Deployment](../week-15-cicd_deployment/) →
