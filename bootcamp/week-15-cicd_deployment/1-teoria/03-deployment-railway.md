# Deployment en Railway

## 🎯 Objetivos

- Desplegar una API Express dockerizada en Railway
- Configurar PostgreSQL como servicio gestionado
- Manejar variables de entorno y secretos en producción
- Interpretar los logs de deploy para diagnosticar problemas

---

## 1. ¿Qué es Railway?

Railway es una plataforma PaaS (Platform as a Service) que despliega
aplicaciones desde un repositorio de GitHub. Detecta automáticamente si
el repo tiene un `Dockerfile` y lo usa.

```
Repositorio GitHub →  Railway detecta Dockerfile
                   →  Construye la imagen
                   →  Ejecuta el contenedor
                   →  Asigna una URL pública HTTPS
```

**Ventajas sobre un VPS manual:**
- Zero-config para apps con Dockerfile
- PostgreSQL y Redis como servicios gestionados sin administrarlos
- Deploy automático en cada push a main
- Logs en tiempo real desde la web

---

## 2. Flujo de Setup Inicial

### Paso 1: Crear proyecto y conectar repositorio

```
Railway Dashboard → New Project → Deploy from GitHub repo
→ Seleccionar repositorio → Railway detecta Dockerfile → Deploy automático
```

### Paso 2: Agregar PostgreSQL

```
En el proyecto → Add Service → Database → PostgreSQL
→ Railway crea la instancia y expone DATABASE_URL como variable
```

### Paso 3: Variables de entorno

```
En el servicio app → Variables → Add Variable

NODE_ENV           = production
JWT_SECRET         = [secret largo aquí]
DATABASE_URL       = [Railway lo agrega automáticamente desde PostgreSQL]
```

> ⚠️ Nunca escribas el valor de `DATABASE_URL` manualmente si usas el
> PostgreSQL de Railway — el servicio inyecta la variable automáticamente
> con el hostname interno correcto.

---

## 3. railway.json (opcional pero recomendado)

Permite personalizar el comportamiento del deploy desde el repositorio:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "startCommand": "node dist/server.js",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## 4. Variables de entorno en producción

| Variable | Fuente |
|----------|--------|
| `DATABASE_URL` | Railway inyecta automáticamente desde el servicio PostgreSQL |
| `NODE_ENV` | Configurar manualmente: `production` |
| `JWT_SECRET` | Secret largo aleatorio — configurar en Railway Variables |
| `PORT` | Railway inyecta automáticamente la variable `PORT` |

### Generar un JWT_SECRET seguro

```bash
# En tu terminal local — genera 32 bytes random en hexadecimal
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 5. Logs y Diagnóstico

```bash
# CLI de Railway (opcional — instalar con npm install -g @railway/cli)
railway login
railway link          # Conectar al proyecto
railway logs          # Ver logs en tiempo real
railway shell         # Shell dentro del contenedor en producción
```

**Errores comunes:**

| Error en logs | Causa probable | Solución |
|---------------|---------------|----------|
| `connection refused` en DB | Variable `DATABASE_URL` incorrecta | Verificar en Railway Variables |
| `pnpm: not found` | `corepack enable` ausente en Dockerfile | Agregar `RUN corepack enable` |
| `Cannot find module` | Stage production no copia `dist/` | Verificar COPY --from=builder |
| `Prisma Client not generated` | Falta `pnpm prisma generate` | Agregar en production stage |

---

## 6. Render como alternativa

Render es otra plataforma PaaS con capa gratuita más generosa para proyectos
personales. El flujo es similar a Railway:

```yaml
# render.yaml (Infrastructure as Code para Render)
services:
  - type: web
    name: mi-api
    runtime: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        generateValue: true       # Render genera el valor automáticamente
      - fromGroup: db-credentials # Grupo de variables compartido

databases:
  - name: mi-db
    databaseName: myapp
    user: pguser
    plan: free
```

---

## 7. Rollback

En Railway, el historial de deploys está disponible en el Dashboard.
Para rollback: seleccionar un deploy anterior → **Redeploy**.

En Render: **Dashboard → Service → Deploys → Rollback**.

---

## ✅ Checklist de Verificación

- [ ] `GET https://mi-api.railway.app/health` responde `200 OK`
- [ ] La respuesta incluye `"db": "connected"` (Prisma conecta a PostgreSQL)
- [ ] `NODE_ENV=production` está configurado como variable de entorno
- [ ] `JWT_SECRET` tiene al menos 32 caracteres aleatorios
- [ ] `DATABASE_URL` apunta al hostname interno del servicio Railway
- [ ] Railway redeploya automáticamente ante un push a `main`
