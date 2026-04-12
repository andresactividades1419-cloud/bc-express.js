# Dockerfile para Node.js / TypeScript

## 🎯 Objetivos

- Escribir un `Dockerfile` correcto para una API Express + TypeScript
- Entender el layer caching y cómo aprovecharlo
- Crear un `.dockerignore` efectivo

---

## 1. Estructura de un Dockerfile

Un `Dockerfile` es una secuencia de instrucciones que Docker ejecuta de arriba
a abajo para construir una imagen. Cada instrucción que modifica el filesystem
crea una nueva **capa**.

### Instrucciones básicas

| Instrucción | Descripción |
|-------------|-------------|
| `FROM image` | Imagen base (siempre la primera instrucción) |
| `WORKDIR /path` | Establece el directorio de trabajo dentro de la imagen |
| `COPY src dest` | Copia archivos del host a la imagen |
| `RUN command` | Ejecuta un comando en el build (instalar deps, compilar) |
| `ENV KEY=value` | Define variable de entorno disponible en runtime |
| `ARG NAME=value` | Variable solo disponible durante el build |
| `EXPOSE port` | Documenta el puerto (no lo publica automáticamente) |
| `CMD ["node", "server.js"]` | Comando por defecto al arrancar el contenedor |
| `USER name` | Cambia el usuario para instrucciones posteriores |

---

## 2. Dockerfile para API Express + TypeScript

```dockerfile
# Imagen base: Node.js 22 sobre Alpine Linux (~60 MB)
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Habilitar pnpm via corepack (incluido en Node 22)
RUN corepack enable

# ── Layer caching trick ──────────────────────────────────────────────
# Copiar SOLO los archivos de dependencias ANTES que el código fuente.
# Si package.json no cambia, Docker reutiliza la capa de pnpm install
# sin reinstalar — builds subsiguientes son mucho más rápidos.
COPY package.json pnpm-lock.yaml ./

# Instalar todas las dependencias (incluyendo devDeps para compilar)
RUN pnpm install --frozen-lockfile

# ── Código fuente ────────────────────────────────────────────────────
# Se copia DESPUÉS de las deps. Si solo cambia código, se rehace desde
# aquí y pnpm install NO se re-ejecuta.
COPY . .

# Compilar TypeScript → dist/
RUN pnpm build

# Documentar el puerto (solo informativo, no lo publica)
EXPOSE 3000

# Arrancar la aplicación compilada
CMD ["node", "dist/server.js"]
```

---

## 3. Layer caching: el orden importa

```
Dockerfile mal ordenado:          Dockerfile bien ordenado:
──────────────────────────        ──────────────────────────
FROM node:22-alpine               FROM node:22-alpine
COPY . .           ← invalida     COPY package.json ./    ← cacheado ✓
RUN pnpm install   ← siempre      RUN pnpm install        ← cacheado ✓
                   re-ejecuta     COPY . .                ← solo esto
                                  RUN pnpm build          ← y esto
```

**Regla**: coloca las instrucciones que cambian con menos frecuencia
(instalación de deps) ANTES que las que cambian frecuentemente (código fuente).

---

## 4. El archivo .dockerignore

Equivalente al `.gitignore` pero para el contexto de build de Docker.
Sin `.dockerignore`, `COPY . .` enviaría `node_modules` (~150 MB) al daemon
de Docker, ralentizando cada build.

```dockerignore
# Dependencias — siempre se instalan dentro de la imagen
node_modules

# Código compilado — se genera dentro de la imagen con pnpm build
dist

# Variables de entorno — NUNCA dentro de una imagen
.env
.env.*
!.env.example

# Git
.git
.gitignore

# Logs y temporales
*.log
npm-debug.log*
.DS_Store

# Archivos de cobertura y tests (no necesarios en prod)
coverage
**/__tests__

# Editor
.vscode
.idea
```

---

## 5. Selección de imagen base

| Imagen | Tamaño | Recomendada para |
|--------|--------|-----------------|
| `node:22` | ~400 MB | Desarrollo con todas las herramientas |
| `node:22-slim` | ~180 MB | Producción sin Alpine cuando hay compatibilidad |
| `node:22-alpine` | ~60 MB | Producción — tamaño mínimo |

**Usa siempre un tag fijo**: `node:22-alpine`, no `node:alpine` ni `node:latest`.
Versiones flotantes rompen reproducibilidad y pueden introducir cambios inesperados.

---

## 6. Variables de entorno en el Dockerfile

```dockerfile
# ENV → disponible en BUILD y RUNTIME
ENV NODE_ENV=production
ENV PORT=3000

# ARG → solo en BUILD (no en el contenedor en ejecución)
ARG BUILD_DATE
RUN echo "Build date: $BUILD_DATE"
```

Para secretos (JWT_SECRET, DATABASE_URL), **NO uses ENV en el Dockerfile**.
Pásalos al runtime con `--env-file` o en docker-compose con `env_file:`.

---

## ✅ Checklist de Verificación

- [ ] El orden de instrucciones aprovecha el layer caching
- [ ] `node_modules` y `.env` están en `.dockerignore`
- [ ] La imagen base tiene tag fijo (`node:22-alpine`, no `latest`)
- [ ] `CMD` usa notación array JSON (`["node", "..."]`) no shell string
- [ ] No hay secretos hardcodeados en el Dockerfile
