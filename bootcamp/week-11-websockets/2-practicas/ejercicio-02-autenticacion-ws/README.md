# Ejercicio 02: Autenticación WebSocket con JWT

Aprenderás a proteger conexiones Socket.io usando el middleware `io.use()`.
El servidor rechazará cualquier conexión sin un JWT válido y adjuntará
los datos del usuario autenticado al socket para usarlos en los handlers.

---

## 🎯 Objetivo

Implementar el flujo completo de autenticación WebSocket:
`io.use()` → `jwt.verify()` → `socket.data.user` → personal room `user:${userId}`.

---

## 📋 Requisitos previos

- Haber completado el Ejercicio 01
- Haber leído `1-teoria/04-autenticacion-ws.md`

---

## 🚀 Instalación

```bash
cd starter
pnpm install
cp .env.example .env
pnpm dev
```

---

## 📝 Pasos del Ejercicio

### PASO 1 — Middleware de autenticación `io.use()` en `auth.ws.ts`

`io.use()` es como un middleware de Express pero para conexiones WebSocket.
Se ejecuta una vez por conexión antes del evento `connection`.

El token JWT llegará en `socket.handshake.auth.token` (el cliente lo envía
en las opciones de conexión: `io(url, { auth: { token } })`).

```ts
// Lo que debes implementar:
io.use((socket, next) => {
  const token = socket.handshake.auth?.token as string | undefined;
  if (!token) return next(new Error('auth_error: token requerido'));
  try {
    const payload = verifyAccessToken(token);
    socket.data.user = payload;
    next();
  } catch {
    next(new Error('auth_error: token inválido o expirado'));
  }
});
```

**Abre `starter/src/middlewares/auth.ws.ts`** y descomenta el bloque del PASO 1.

---

### PASO 2 — Usar `socket.data.user` en los handlers

Una vez autenticado, todos los handlers tienen acceso a `socket.data.user`.
Úsalo para personalizar la respuesta o para acceder al `userId`.

```ts
// Lo que debes implementar:
socket.on('ping', () => {
  socket.emit('pong', {
    message: `Hola ${socket.data.user.email}`,
    timestamp: new Date().toISOString(),
  });
});
```

**Abre `starter/src/handlers/events.handler.ts`** y descomenta el bloque del PASO 2.

---

### PASO 3 — Unirse al personal room en la conexión

El personal room `user:${userId}` permite emitir a un usuario específico desde
cualquier parte del servidor, incluso desde controladores REST.

```ts
// Lo que debes implementar:
io.on('connection', (socket) => {
  const { userId } = socket.data.user;
  socket.join(`user:${userId}`);
  // Desde un controlador REST: io.to(`user:${userId}`).emit('notification', data)
});
```

**Abre `starter/src/server.ts`** y descomenta el bloque del PASO 3.

---

### PASO 4 — Registrar el middleware antes de `connection`

El middleware `io.use()` debe registrarse **antes** del evento `connection`.
Si se registra después, las conexiones ya existentes no pasarán por él.

```ts
// Lo que debes implementar en server.ts:
authWsMiddleware(io);              // 1. Primero el middleware
io.on('connection', (socket) => {  // 2. Luego los handlers
  registerEventHandlers(io, socket);
});
```

**Abre `starter/src/server.ts`** y descomenta el bloque del PASO 4.

---

## ✅ Verificación

El ejercicio incluye endpoints REST para obtener un token de acceso:

```bash
# 1. Registrar un usuario
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"secret123","name":"Alice"}'

# 2. Hacer login para obtener el token
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@test.com","password":"secret123"}'
# ← guarda el accessToken de la respuesta
```

Luego conecta con Thunder Client WS usando `auth: { token: "<accessToken>" }`.

**Secuencia de prueba:**
1. Intenta conectar sin token → debe recibir `connect_error: auth_error`
2. Conectar con token válido → debe conectar correctamente
3. Emitir evento `ping` → debe recibir `pong` con el email del usuario
4. El socket debe unirse a `user:<userId>` automáticamente

---

## 📁 Estructura del Ejercicio

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── config/env.ts              ← Variables de entorno
    ├── types/index.ts             ← Interfaces Socket.io + TokenPayload
    ├── utils/jwt.ts               ← generateAccessToken / verifyAccessToken
    ├── data/users.store.ts        ← Store en memoria (sin BD)
    ├── validators/auth.schema.ts  ← Zod: RegisterDto, LoginDto
    ├── controllers/
    │   └── auth.controller.ts     ← register / login (dado)
    ├── routes/
    │   └── auth.routes.ts         ← POST /auth/register, /auth/login (dado)
    ├── middlewares/
    │   ├── auth.ws.ts             ← (PASO 1) Middleware io.use()
    │   └── error.middleware.ts    ← Manejo global de errores (dado)
    ├── handlers/
    │   └── events.handler.ts      ← (PASO 2) Eventos protegidos
    ├── app.ts                     ← Express con rutas (dado)
    └── server.ts                  ← (PASO 3, 4) HTTP + Socket.io
```
