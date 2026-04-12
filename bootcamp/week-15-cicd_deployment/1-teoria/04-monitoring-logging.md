# Monitoring y Logging Estructurado

## 🎯 Objetivos

- Implementar logging estructurado con Winston en formato JSON
- Integrar Logtail/BetterStack para centralizar logs de producción
- Diseñar un endpoint `/health` robusto
- Interpretar logs para diagnosticar problemas en producción

---

## 1. ¿Por qué logging estructurado?

```bash
# Logging tradicional (texto plano) — difícil de filtrar y analizar
console.log("Error al crear usuario: email duplicado")

# Logging estructurado (JSON) — indexable, filtrable, buscable
{"level":"error","message":"Duplicate email","email":"u@u.com","statusCode":409,"timestamp":"2026-04-12T10:00:00.000Z"}
```

En producción, los logs estructurados permiten:
- Buscar errores por campo (`statusCode`, `userId`, `route`)
- Crear alertas automáticas cuando aparecen ciertos patrones
- Correlacionar requests con errores usando un `requestId`

---

## 2. Winston — Setup Completo

```bash
pnpm add winston@3.17.0
pnpm add -D @types/winston@2.4.4
```

```ts
// src/lib/logger.ts
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),                    // Formato JSON en producción
  ),
  transports: [
    new transports.Console(),
  ],
});
```

### Uso en servicios y controllers

```ts
import { logger } from '../lib/logger';

// En un servicio
try {
  const user = await prisma.user.create({ data });
  logger.info('User created', { userId: user.id, email: user.email });
  return user;
} catch (error) {
  logger.error('Failed to create user', { error, email: data.email });
  throw error;
}
```

---

## 3. Logtail / BetterStack

[BetterStack Logtail](https://logs.betterstack.com/) centraliza logs de todas
tus fuentes (Railway, Render, VPS) en un dashboard con búsqueda y alertas.

### Integración con Winston

```bash
pnpm add @logtail/node@0.5.5 @logtail/winston@0.5.5
```

```ts
// src/lib/logger.ts
import { createLogger, format, transports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN ?? '');

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.Console(),
    ...(process.env.LOGTAIL_SOURCE_TOKEN
      ? [new LogtailTransport(logtail)]  // Solo en producción si hay token
      : []),
  ],
});
```

Variables de entorno a agregar en Railway:
```
LOGTAIL_SOURCE_TOKEN = [obtenido desde BetterStack → Sources → Node.js]
```

---

## 4. Endpoint /health Robusto

El health check es el mecanismo principal para verificar si la app funciona
correctamente en producción.

```ts
// En app.ts
app.get('/health', async (_req, res) => {
  try {
    // Verificar conexión a la base de datos
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      db: 'connected',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version ?? '0.0.0',
    });
  } catch (error) {
    // 503 Service Unavailable — Railway/Render lo detecta y redeploya
    logger.error('Health check failed', { error });
    res.status(503).json({
      status: 'error',
      db: 'disconnected',
      timestamp: new Date().toISOString(),
    });
  }
});
```

### Respuesta esperada en producción

```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 432,
  "timestamp": "2026-04-12T10:00:00.000Z",
  "version": "1.0.0"
}
```

---

## 5. Request Logging con Morgan

```bash
pnpm add morgan@1.10.0
pnpm add -D @types/morgan@1.9.9
```

```ts
// src/app.ts
import morgan from 'morgan';
import { logger } from './lib/logger';

// Stream de Morgan hacia Winston
const morganStream = {
  write: (message: string) =>
    logger.http(message.trim()),
};

// En desarrollo: formato legible. En producción: JSON compacto.
app.use(
  morgan(
    process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
    { stream: morganStream },
  ),
);
```

---

## ✅ Checklist de Verificación

- [ ] Los logs son JSON en producción (`format.json()`)
- [ ] `logger.error()` incluye el objeto `error` para capturar el stack trace
- [ ] `GET /health` retorna `200` con `db: connected` cuando la DB está disponible
- [ ] `GET /health` retorna `503` cuando la DB no está disponible
- [ ] `LOGTAIL_SOURCE_TOKEN` está configurado en Railway Variables (si se usa)
- [ ] No hay `console.log()` en código de producción — solo llamadas a `logger`
