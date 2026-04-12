# 🚀 Proyecto Semanal: CI/CD para tu API de Dominio

## 🎯 Objetivo

Implementar un pipeline CI/CD completo para la API REST de tu dominio asignado
(de semana 14). El pipeline automáticamente verifica el código en cada PR y
despliega la versión en main a Railway o Render.

---

## 📋 Tu Dominio Asignado

**Dominio**: El instructor te asignará tu dominio específico.

---

## 🛠️ Setup del starter

```bash
cd starter
pnpm install
cp .env.example .env
pnpm prisma migrate dev --name init
pnpm dev
# Verifica: GET http://localhost:3000/health → { "status": "ok" }
pnpm test   # Deben pasar todos los tests
```

---

## 📋 Tareas

### TODO 1 — Completar `.github/workflows/ci.yml`

El workflow debe tener al menos los siguientes steps:
1. `actions/checkout@v4`
2. `pnpm/action-setup@v4` con version `10`
3. `actions/setup-node@v4` con Node.js 22 y cache pnpm
4. `pnpm install --frozen-lockfile`
5. `pnpm build`
6. `pnpm test`

### TODO 2 — Agregar badge de CI al README

Una vez que el pipeline esté en verde, agrega el badge en tu README:
```markdown
![CI](https://github.com/TU_USUARIO/TU_REPO/actions/workflows/ci.yml/badge.svg)
```

### TODO 3 — Desplegar en Railway o Render

1. Crear proyecto en Railway/Render conectado al repositorio
2. Configurar variables de entorno: `NODE_ENV`, `JWT_SECRET`, `DATABASE_URL`
3. Verificar `GET https://tu-api.PLATAFORMA.app/health` → `200 OK`
4. Verificar que un push a `main` dispara redeploy automático

### TODO 4 — Completar el endpoint `/health` con verificación de DB

```ts
// Debe verificar la conexión a la DB y retornar 503 si no hay conexión
app.get('/health', async (_req, res) => {
  // TODO: await prisma.$queryRaw`SELECT 1`
  // TODO: retornar { status: 'ok', db: 'connected', uptime, timestamp }
  // TODO: retornar 503 si la DB no responde
});
```

---

## 💡 Ejemplos de Adaptación por Dominio

| Dominio | Endpoint principal | Tests a incluir |
|---------|--------------------|-----------------|
| 📖 Biblioteca | `GET /api/v1/books` | Lista de libros, creación, 404 |
| 💊 Farmacia | `GET /api/v1/medicines` | Lista, creación, stock |
| 🏋️ Gimnasio | `GET /api/v1/members` | Lista, activar/desactivar |
| 🍽️ Restaurante | `GET /api/v1/dishes` | Lista, disponibilidad |

---

## ✅ Entregables

1. **Pipeline CI en verde**: Enlace a GitHub Actions con último run exitoso
2. **Badge de CI** en el README del proyecto con estado actual
3. **URL de producción**: `https://mi-api.PLATAFORMA.app/health` → `200 OK`
4. **Screenshot de logs de deploy** exitoso en Railway/Render
5. **Variables de entorno** en la plataforma (sin secretos en código)
6. **Tests pasando**: al menos 5 assertions en el pipeline de CI

---

## 🔗 Recursos

- [Semana 15 — Teoría CI/CD](../../1-teoria)
- [Ejercicio 01 — GitHub Actions](../../2-practicas/ejercicio-01-github-actions)
- [Ejercicio 02 — Deployment](../../2-practicas/ejercicio-02-deployment)
- [Semana 14 — Docker](../../../week-14-docker/README.md)
