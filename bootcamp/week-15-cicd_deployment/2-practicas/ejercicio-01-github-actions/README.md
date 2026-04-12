# Ejercicio 01 — GitHub Actions: Pipeline CI

En este ejercicio crearás un workflow de GitHub Actions para una API Express
con tests. El pipeline correrá automáticamente en cada push y PR.

![Anatomía de un workflow](../../0-assets/02-github-actions-workflow.svg)

---

## 🛠️ Setup

```bash
cd starter
pnpm install
pnpm test              # Verifica que los tests pasan localmente
pnpm build             # Verifica que TypeScript compila sin errores
```

Luego **sube tu fork a GitHub** (necesitas un repositorio remoto para que
GitHub Actions ejecute los workflows).

---

## PASO 1 — Trigger y checkout

**Abre `starter/.github/workflows/ci.yml`** y descomenta el bloque del PASO 1.

Debe configurar:
- Nombre del workflow: `CI`
- Trigger: `push` y `pull_request` en la rama `main`
- Un job llamado `test` con runner `ubuntu-latest`
- Step de checkout con `actions/checkout@v4`

Verifica que el archivo YAML es válido:
```bash
# Si tienes GitHub CLI instalado:
gh workflow list    # Debe aparecer "CI"
```

---

## PASO 2 — Setup pnpm + Node.js + cache

**Descomenta el bloque del PASO 2** en el mismo archivo.

Debe agregar:
- `pnpm/action-setup@v4` con `version: 10`
- `actions/setup-node@v4` con `node-version: '22'` y `cache: 'pnpm'`
- Step `run: pnpm install --frozen-lockfile`

Haz push y verifica en GitHub → Actions que el job llega al paso de install.

---

## PASO 3 — Build + Tests

**Descomenta el bloque del PASO 3.**

Agrega los steps:
```yaml
- run: pnpm build
- run: pnpm test
```

Haz push y espera a que el pipeline pase completamente (ícono verde ✓).

---

## PASO 4 — Variables de entorno para tests

**Descomenta el bloque del PASO 4.**

Los tests de integración necesitan variables de entorno. Agrégalas con
el bloque `env:` del job (no hardcodeadas — usa `secrets`):

```yaml
jobs:
  test:
    env:
      NODE_ENV: test
      JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

Agrega el secret en **GitHub → tu repo → Settings → Secrets and variables
→ Actions → New repository secret**:
- Nombre: `JWT_SECRET`
- Valor: cualquier string de 32+ caracteres para entorno de test

---

## ✅ Criterios de éxito

- Pipeline `CI` aparece en la pestaña **Actions** del repositorio
- El ícono del último run es verde (✓) en todos los steps
- El nombre del job en Actions muestra: checkout → setup → install → build → test
- El pipeline falla en rojo si introduces un error de TypeScript intencionalmente
