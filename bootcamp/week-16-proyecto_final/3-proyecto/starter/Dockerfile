# ── Stage 1: builder ─────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# ── Stage 2: production ──────────────────────────────────────────
FROM node:22-alpine AS production
WORKDIR /app
RUN corepack enable
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/prisma ./prisma
RUN pnpm install --prod --frozen-lockfile
RUN pnpm prisma generate
EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/server.js"]
