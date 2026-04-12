# Ejercicio 01: Chat Básico con Rooms

Construirás un servidor de chat en tiempo real usando Socket.io y Express.
Los usuarios se podrán unir a salas, enviar mensajes y recibir notificaciones
cuando otros entran o salen.

---

## 🎯 Objetivo

Practicar la inicialización de Socket.io con Express y los patrones básicos
de events y rooms: `socket.join()`, `socket.to(room).emit()`, `io.to(room).emit()`.

---

## 📋 Requisitos previos

- Haber leído `1-teoria/02-socketio-servidor.md`
- Node.js 22+ y pnpm instalados

---

## 🚀 Instalación

```bash
cd starter
pnpm install
cp .env.example .env
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`.

---

## 📝 Pasos del Ejercicio

### PASO 1 — Inicializar Socket.io en `server.ts`

Socket.io necesita acceso al **servidor HTTP** subyacente, no al objeto `app` de Express.
El truco es crear primero el servidor HTTP con `http.createServer(app)` y luego
pasar ese servidor al constructor de Socket.io.

```ts
// Ejemplo para entender el concepto:
import http from 'http';
import { Server } from 'socket.io';
import { app } from './app';

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
});

httpServer.listen(3000);
```

**Abre `starter/src/server.ts`** y descomenta el bloque del PASO 1.

---

### PASO 2 — Manejar el evento `sendMessage`

Cuando un cliente emite `sendMessage`, debemos retransmitir el mensaje a **todos** en
la sala (incluyendo al emisor). Usamos `io.to(room).emit()` para esto.

```ts
// Ejemplo:
socket.on('sendMessage', ({ text, room }) => {
  io.to(room).emit('message', {
    id: `${Date.now()}`,
    text,
    username: socket.data.username ?? 'Anónimo',
    room,
    timestamp: new Date().toISOString(),
  });
});
```

**Abre `starter/src/handlers/chat.handler.ts`** y descomenta el bloque del PASO 2.

---

### PASO 3 — Manejar el evento `joinRoom`

Cuando un usuario se une a una sala:
1. Si estaba en otra sala, debe salir primero.
2. Se une a la nueva sala con `socket.join(room)`.
3. Se notifica a los **demás** en la sala con `socket.to(room).emit('userJoined')`.
4. Se envía la lista de usuarios actuales a **todos** en la sala.

```ts
// Ejemplo:
socket.on('joinRoom', async ({ username, room }) => {
  if (socket.data.currentRoom) {
    socket.leave(socket.data.currentRoom);
    socket.to(socket.data.currentRoom).emit('userLeft', {
      username: socket.data.username ?? '',
      room: socket.data.currentRoom,
      timestamp: new Date().toISOString(),
    });
  }

  await socket.join(room);
  socket.data.username = username;
  socket.data.currentRoom = room;

  socket.to(room).emit('userJoined', { username, room, timestamp: new Date().toISOString() });

  const sockets = await io.in(room).fetchSockets();
  const users = sockets.map((s) => s.data.username).filter(Boolean);
  io.to(room).emit('roomUsers', { room, users });
});
```

**Descomenta el bloque del PASO 3** en `chat.handler.ts`.

---

### PASO 4 — Manejar la desconexión

Cuando un cliente se desconecta (cierra el tab, pierde conexión), debemos notificar
a su sala actual que el usuario se fue. El evento `disconnect` se dispara automáticamente.

```ts
// Ejemplo:
socket.on('disconnect', (reason) => {
  if (socket.data.currentRoom) {
    socket.to(socket.data.currentRoom).emit('userLeft', {
      username: socket.data.username ?? 'Desconocido',
      room: socket.data.currentRoom,
      timestamp: new Date().toISOString(),
    });
  }
  console.log(`❌ ${socket.id} desconectado: ${reason}`);
});
```

**Descomenta el bloque del PASO 4** en `chat.handler.ts`.

---

## ✅ Verificación

Usa [wscat](https://github.com/websockets/wscat) o [Thunder Client (WS)](https://www.thunderclient.com/)
para probar el ejercicio:

```bash
# Instalar wscat globalmente
pnpm add -g wscat@5.0.0

# Conectar como cliente 1
wscat -c ws://localhost:3000/socket.io/?EIO=4&transport=websocket
```

O preferiblemente usa la extensión **Thunder Client** de VS Code que tiene soporte
para WebSocket y muestra los eventos de forma visual.

**Secuencia de prueba:**
1. Cliente 1 emite `joinRoom` → `{ "username": "Alice", "room": "general" }`
2. Cliente 2 emite `joinRoom` → `{ "username": "Bob", "room": "general" }`
3. Verificar que Cliente 1 recibe `userJoined` con datos de Bob
4. Cliente 1 emite `sendMessage` → `{ "text": "Hola Bob!", "room": "general" }`
5. Verificar que ambos clientes reciben el evento `message`
6. Desconectar Cliente 1 — verificar que Cliente 2 recibe `userLeft`

---

## 📁 Estructura del Ejercicio

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── config/
    │   └── env.ts          ← Variables de entorno validadas con Zod
    ├── types/
    │   └── index.ts        ← Interfaces TypeScript para eventos Socket.io
    ├── handlers/
    │   └── chat.handler.ts ← (PASO 2, 3, 4) Lógica de eventos de chat
    ├── app.ts              ← Express con CORS y middlewares básicos
    └── server.ts           ← (PASO 1) HTTP server + Socket.io initialization
```
