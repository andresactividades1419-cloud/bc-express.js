# Rúbrica de Evaluación — Semana 15: CI/CD y Deployment

## 🧠 Conocimiento (30%)

### Cuestionario de Verificación

1. ¿Qué diferencia hay entre **CI** (Continuous Integration) y **CD** (Continuous Deployment)?
2. ¿En qué archivo y carpeta se define un workflow de GitHub Actions?
3. ¿Qué significa el trigger `on: push: branches: [main]`?
4. ¿Para qué sirve `actions/cache` en un workflow? Nombra qué se cachea para proyectos Node.js.
5. ¿Cómo se referencia un secret de GitHub dentro de un workflow YAML?
6. ¿Qué ventaja tiene el comando `pnpm install --frozen-lockfile` en CI sobre `pnpm install`?
7. ¿Por qué Railway puede detectar automáticamente que una app usa Docker?
8. ¿Qué retorna el endpoint `/health` en una API bien configurada? ¿Qué campos mínimos debe incluir?
9. ¿Cuál es la diferencia entre logs de aplicación y logs de infraestructura?
10. Describe el flujo completo desde un `git push` hasta que la API está actualizada en producción.

---

## 💪 Desempeño (40%)

### Ejercicio 01 — Pipeline CI con GitHub Actions

#### PASO 1: Trigger y checkout

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | Configura triggers correctos (`push` + `pull_request` en `main`), checkout con `actions/checkout@v4`, runner `ubuntu-latest` |
| **Satisfactorio** (3) | Trigger correcto, checkout funcional, un runner correcto |
| **Básico** (2) | Workflow existe pero con errores menores de indentación o trigger incorrecto |
| **Insuficiente** (1) | Workflow no ejecuta o no tiene trigger válido |

#### PASO 2: Setup pnpm + Node.js + cache

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | Usa `pnpm/action-setup@v4`, `actions/setup-node@v4` con `cache: pnpm`, versión Node.js 22 |
| **Satisfactorio** (3) | Setup correcto pero sin cache |
| **Básico** (2) | Setup funcional con npm o sin versiones fijas |
| **Insuficiente** (1) | No instala las herramientas necesarias |

#### PASO 3: Install + build + test

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | `pnpm install --frozen-lockfile`, `pnpm build` y `pnpm test` todos en verde en GitHub |
| **Satisfactorio** (3) | Install y build pasan, test con advertencias menores |
| **Básico** (2) | Al menos install pasa, build o test fallan |
| **Insuficiente** (1) | Pipeline no pasa en ningún paso |

#### PASO 4: Variables de entorno en CI

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | Variables de entorno para tests usando `env:` o secrets de GitHub, sin valores hardcodeados |
| **Satisfactorio** (3) | Variables configuradas pero con un secret expuesto |
| **Básico** (2) | Variables hardcodeadas en el workflow |
| **Insuficiente** (1) | No configura variables de entorno |

---

### Ejercicio 02 — Deployment en Railway/Render

#### PASO 1: Proyecto creado y conectado al repositorio

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | Proyecto creado en Railway/Render, repositorio conectado, Dockerfile detectado automáticamente |
| **Satisfactorio** (3) | Proyecto creado y conectado pero build manual |
| **Básico** (2) | Proyecto creado pero sin conexión al repositorio |
| **Insuficiente** (1) | No crea proyecto en ninguna plataforma |

#### PASO 2: Variables de entorno configuradas

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | Todas las variables en el panel de la plataforma: `DATABASE_URL`, `NODE_ENV`, `JWT_SECRET` sin hardcodear |
| **Satisfactorio** (3) | Variables principales configuradas, falta alguna secundaria |
| **Básico** (2) | Algunas variables configuradas, app no arranca correctamente |
| **Insuficiente** (1) | No configura variables de entorno |

#### PASO 3: Deploy exitoso

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | `GET https://mi-api.railway.app/health` responde `200 OK` con `{ status: "ok", db: "connected" }` |
| **Satisfactorio** (3) | App desplegada pero health check retorna error de DB |
| **Básico** (2) | App desplegada con errores parciales |
| **Insuficiente** (1) | Deploy falla sin resolver |

#### PASO 4: Deploy automático en push a main

| Nivel | Criterio |
|-------|----------|
| **Excelente** (4) | Un `git push` a `main` dispara el redeploy automáticamente y la app se actualiza |
| **Satisfactorio** (3) | Deploy automático configurado pero requiere aprobación manual |
| **Básico** (2) | Deploy manual funcional |
| **Insuficiente** (1) | No configura deploy automático |

---

## 📦 Producto (30%)

### Criterios de Evaluación del Proyecto

| Criterio | Puntaje |
|----------|---------|
| `.github/workflows/ci.yml` funcional (pipeline en verde) | 15 pts |
| Pipeline con al menos 3 jobs/steps: install, build, test | 15 pts |
| API desplegada con URL pública accesible | 20 pts |
| `GET /health` retorna `200 OK` con db connected en producción | 15 pts |
| Variables de entorno en plataforma (sin secretos en código) | 15 pts |
| README del proyecto con URL de producción y badge de CI | 10 pts |
| Deploy automático ante push a `main` | 10 pts |
| **Total** | **100 pts** |

---

## ✅ Tabla de Aprobación

| Componente | Peso | Mínimo para aprobar |
|------------|------|---------------------|
| Conocimiento | 30% | 7/10 preguntas correctas |
| Desempeño | 40% | Nivel Básico (2) en todos los pasos |
| Producto | 30% | 70 / 100 puntos |
