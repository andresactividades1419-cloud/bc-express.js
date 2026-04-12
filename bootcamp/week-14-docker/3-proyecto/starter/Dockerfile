# ============================================================
# TODO 2: Completar el Dockerfile multi-stage
#
# Instrucciones:
# 1. Completa el stage "builder":
#    - Imagen base: node:22-alpine
#    - Habilitar pnpm con corepack enable
#    - Copiar lockfiles ANTES del código fuente
#    - pnpm install --frozen-lockfile
#    - pnpm prisma generate
#    - pnpm build
#
# 2. Completa el stage "production":
#    - Nueva imagen base: node:22-alpine
#    - Habilitar corepack
#    - Copiar solo dist/, package.json, pnpm-lock.yaml, prisma/
#    - pnpm install --prod --frozen-lockfile
#    - pnpm prisma generate
#    - USER node (no root)
#    - HEALTHCHECK
#    - CMD
#
# Referencia: 1-teoria/03-multistage-builds.md
# ============================================================

# ── Stage 1: builder ─────────────────────────────────────────
# TODO: FROM node:22-alpine AS builder
# TODO: WORKDIR /app
# TODO: RUN corepack enable
# TODO: COPY package.json pnpm-lock.yaml ./
# TODO: RUN pnpm install --frozen-lockfile
# TODO: COPY . .
# TODO: RUN pnpm prisma generate
# TODO: RUN pnpm build

# ── Stage 2: production ──────────────────────────────────────
# TODO: FROM node:22-alpine AS production
# TODO: WORKDIR /app
# TODO: RUN corepack enable
# TODO: COPY --from=builder /app/dist ./dist
# TODO: COPY --from=builder /app/package.json ./
# TODO: COPY --from=builder /app/pnpm-lock.yaml ./
# TODO: COPY --from=builder /app/prisma ./prisma
# TODO: RUN pnpm install --prod --frozen-lockfile
# TODO: RUN pnpm prisma generate
# TODO: EXPOSE 3000
# TODO: USER node
# TODO: Agregar HEALTHCHECK (ver 1-teoria/03-multistage-builds.md)
# TODO: CMD ["node", "dist/server.js"]
