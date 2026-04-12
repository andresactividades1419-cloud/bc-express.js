# ============================================================
# PASO 1: Dockerfile single-stage
# ============================================================
# Descomenta todas las líneas de esta sección.
# Objetivo: construir y ejecutar la API en un solo stage.
#
# Referencia: 1-teoria/02-dockerfile-nodejs.md
# Verificación:
#   docker build -t ejercicio-01:single .
#   docker run -d -p 3000:3000 --name api-test ejercicio-01:single
#   curl http://localhost:3000/health
#   docker rm -f api-test

# FROM node:22-alpine
# WORKDIR /app
# RUN corepack enable
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm build
# EXPOSE 3000
# CMD ["node", "dist/server.js"]


# ============================================================
# PASO 3: Dockerfile multi-stage
# ============================================================
# Comenta el bloque del PASO 1 y descomenta este.
# Objetivo: reducir el tamaño de la imagen de producción
#           eliminando devDeps y código fuente TypeScript.
#
# Referencia: 1-teoria/03-multistage-builds.md
# Verificación:
#   docker build -t ejercicio-01:multi .
#   docker images | grep ejercicio-01
#   (la imagen multi debe ser ~5x más pequeña)

# # ── Stage 1: builder ──────────────────────────────────────
# FROM node:22-alpine AS builder
# WORKDIR /app
# RUN corepack enable
# COPY package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile
# COPY . .
# RUN pnpm build

# # ── Stage 2: production ──────────────────────────────────
# FROM node:22-alpine AS production
# WORKDIR /app
# RUN corepack enable
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/pnpm-lock.yaml ./
# RUN pnpm install --prod --frozen-lockfile
# EXPOSE 3000
# USER node

# # PASO 4: Agrega HEALTHCHECK aquí (ver README)
# # HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
# #   CMD wget -qO- http://localhost:3000/health || exit 1

# CMD ["node", "dist/server.js"]
