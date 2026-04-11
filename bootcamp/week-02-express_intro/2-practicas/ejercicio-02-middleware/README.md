# Ejercicio 02 — Middleware Chain: Logger, Auth y Error Handler

## 🎯 Objetivo

Construir una cadena de middleware personalizada en Express 5 con TypeScript. Aprenderás a:

- Crear un middleware de logging que registre método, URL y tiempo de respuesta
- Crear un middleware de autenticación básica por API key
- Implementar un error handler global con exactamente 4 parámetros
- Entender el orden correcto en que se registran los middlewares

---

## 📋 Estructura del ejercicio

```
ejercicio-02-middleware/
└── starter/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── app.ts
        ├── server.ts
        └── middlewares/
            ├── logger.ts
            ├── auth.ts
            └── errorHandler.ts
```

---

## 📝 Pasos

### Paso 1: Middleware de logging

Abre `src/middlewares/logger.ts` y descomenta el bloque del **Paso 1**.

El logger debe:
- Registrar `[METHOD] /ruta → statusCode (Xms)` por cada petición
- Calcular el tiempo usando `Date.now()` antes y después de la respuesta
- Llamar `next()` para continuar la cadena

```bash
# Ejemplo de salida esperada en consola:
[GET] /api/v1/items → 200 (3ms)
[POST] /api/v1/items → 401 (1ms)
```

---

### Paso 2: Middleware de autenticación por API key

Abre `src/middlewares/auth.ts` y descomenta el bloque del **Paso 2**.

El middleware debe:
- Leer el header `x-api-key` de la petición
- Compararlo con `process.env.API_KEY`
- Si no coincide, responder con `401` y `{ error: 'Unauthorized' }`
- Si es válido, llamar `next()`

Configura tu `.env` copiando `.env.example`:

```bash
cp .env.example .env
```

Prueba:

```bash
# Sin API key — debe retornar 401
curl http://localhost:3000/api/v1/items

# Con API key válida — debe retornar 200
curl http://localhost:3000/api/v1/items \
  -H "x-api-key: mi-clave-secreta"
```

---

### Paso 3: Error handler global

Abre `src/middlewares/errorHandler.ts` y descomenta el bloque del **Paso 3**.

El error handler debe:
- Tener exactamente 4 parámetros: `(err, req, res, next)`
- Registrar el error en consola
- Responder con `500` en producción (sin exponer el stack trace)
- Responder con el mensaje de error en desarrollo

```ts
// Pista: usa process.env.NODE_ENV para distinguir entornos
```

---

### Paso 4: Registrar todos los middlewares en orden correcto

Abre `src/app.ts` y descomenta el bloque del **Paso 4**, registrando los middlewares en este orden:

1. `express.json()`
2. `logger`
3. Rutas — `app.use('/api/v1/items', itemsRouter)`
4. Middleware 404 (para rutas no encontradas)
5. `errorHandler` — **siempre último**

Verifica que el logger aparece para todas las peticiones y que el error handler captura errores lanzados en las rutas.

---

## ✅ Criterios de verificación

- [ ] El logger registra cada petición con método, ruta, status y tiempo
- [ ] Una petición sin `x-api-key` retorna 401
- [ ] Una petición con `x-api-key` correcta pasa al route handler
- [ ] El error handler tiene exactamente 4 parámetros
- [ ] El orden en `app.ts` es: json → logger → auth → routes → 404 → errorHandler
- [ ] TypeScript compila sin errores (`pnpm build`)
