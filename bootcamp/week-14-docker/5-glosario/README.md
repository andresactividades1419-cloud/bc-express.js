# Glosario — Semana 14: Docker

Términos clave ordenados alfabéticamente.

---

## A

**Alpine Linux**
Distribución Linux ultra-ligera (~5 MB) usada como base para imágenes Docker
minimalistas. La etiqueta `-alpine` (e.g., `node:22-alpine`) reduce el tamaño
de la imagen final significativamente.

---

## B

**Base image (imagen base)**
La imagen de partida definida con `FROM`. Proporciona el sistema operativo y
las herramientas mínimas. Ejemplo: `FROM node:22-alpine`.

**Build context (contexto de build)**
Conjunto de archivos que Docker envía al daemon al ejecutar `docker build`.
Lo controla `.dockerignore`. Un contexto grande ralentiza los builds.

---

## C

**CMD**
Instrucción Dockerfile que define el comando por defecto al arrancar un
contenedor. Ejemplo: `CMD ["node", "dist/server.js"]`.

**Container (contenedor)**
Instancia en ejecución de una imagen Docker. Es efímero por defecto: al
eliminarlo, sus datos desaparecen (salvo que use un volumen).

**COPY**
Instrucción Dockerfile para copiar archivos del host a la imagen.
`COPY --from=builder` copia entre stages en un multi-stage build.

**corepack**
Herramienta incluida en Node.js 18+ que gestiona package managers (pnpm, yarn).
En Docker: `RUN corepack enable` activa pnpm sin necesidad de `npm install -g pnpm`.

---

## D

**depends_on**
Directiva de docker-compose para controlar el orden de arranque de servicios.
Con `condition: service_healthy` espera a que el health check del servicio
dependiente pase antes de iniciar.

**dist/**
Directorio de salida del compilador TypeScript (`tsc`). Contiene el JavaScript
listo para producción. Se genera en el stage `builder` y se copia al stage
`production`.

**docker-compose**
Herramienta para definir y correr aplicaciones multi-contenedor con un archivo
YAML. `docker compose up -d` arranca todos los servicios definidos.

**.dockerignore**
Archivo de exclusiones para el contexto de build (similar a `.gitignore`).
Evitar incluir `node_modules`, `.env`, `.git` y `dist` en la imagen.

**Dockerfile**
Archivo de instrucciones para construir una imagen Docker paso a paso.
Cada instrucción (`FROM`, `RUN`, `COPY`, etc.) genera una capa inmutable.

---

## E

**ENV**
Instrucción Dockerfile para definir variables de entorno que estarán
disponibles **en tiempo de ejecución** del contenedor.

**env_file**
Directiva de docker-compose que carga un archivo `.env` como variables de
entorno del servicio. Evita hardcodear secretos en el YAML.

**EXPOSE**
Instrucción Dockerfile que documenta qué puerto escucha el contenedor.
No abre el puerto en el host — eso lo hace `ports:` en docker-compose.

---

## F

**FROM**
Primera instrucción de un Dockerfile. Define la imagen base.
En multi-stage: cada `FROM` inicia un nuevo stage.

---

## H

**HEALTHCHECK**
Instrucción Dockerfile que define un comando para verificar si el contenedor
está "sano". Docker lo ejecuta periódicamente y actualiza el estado del
contenedor a `healthy`, `unhealthy` o `starting`.

---

## I

**Image (imagen)**
Plantilla inmutable de solo lectura para crear contenedores. Se construye
con `docker build` y se compone de capas (`layers`).

---

## L

**Layer caching (caché de capas)**
Docker reutiliza capas sin cambios entre builds. El orden de las instrucciones
importa: copiar `package.json` antes que el código fuente permite que la capa
de `pnpm install` se cachee aunque el código cambie.

**Layer (capa)**
Cada instrucción en un Dockerfile genera una capa inmutable almacenada en
caché. Las capas se apilan para formar la imagen final.

---

## M

**Multi-stage build**
Técnica que usa múltiples `FROM` en un Dockerfile para separar el entorno de
compilación del de producción. El stage `builder` compila, el stage
`production` solo incluye los artefactos necesarios.

---

## N

**Named volume (volumen nombrado)**
Volumen gestionado por Docker con un nombre explícito. Persiste datos entre
reinicios de contenedores. Se declara en `volumes:` de docker-compose y se
monta en el servicio.

---

## P

**pg_isready**
Herramienta de PostgreSQL para verificar si el servidor está listo para
recibir conexiones. Usada en health checks:
`["CMD-SHELL", "pg_isready -U user -d dbname"]`.

**pnpm install --frozen-lockfile**
Instala exactamente las versiones del `pnpm-lock.yaml` sin modificarlo.
Equivalente a `npm ci`. Garantiza builds reproducibles en Docker y CI.

**ports**
Directiva de docker-compose que mapea puertos: `"host:container"`.
Solo el servicio `app` expone puertos al host; las bases de datos son internas.

---

## R

**Registry (registro)**
Servidor de almacenamiento de imágenes Docker. Docker Hub es el registro
público por defecto (`hub.docker.com`). También existen registros privados
como GitHub Container Registry (ghcr.io) o AWS ECR.

**RUN**
Instrucción Dockerfile que ejecuta un comando durante la construcción de la
imagen. Cada `RUN` genera una nueva capa.

---

## S

**service (servicio)**
En docker-compose, cada bloque bajo `services:` define un contenedor con su
imagen, configuración, dependencias y red.

---

## U

**USER**
Instrucción Dockerfile para cambiar el usuario con el que se ejecuta el
contenedor. `USER node` usa el usuario sin privilegios incluido en las
imágenes oficiales de Node.js Alpine, mejorando la seguridad.

---

## V

**Volume (volumen)**
Mecanismo para persistir datos fuera del ciclo de vida del contenedor.
- **Named volume**: `pg_data:/var/lib/postgresql/data` — Docker gestiona la ubicación
- **Bind mount**: `/host/path:/container/path` — solo para desarrollo local

---

## W

**WORKDIR**
Instrucción Dockerfile para establecer el directorio de trabajo. Todas las
instrucciones posteriores (`COPY`, `RUN`, `CMD`) se ejecutan en esa ruta.
