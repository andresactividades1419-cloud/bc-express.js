# Socket.io: Cliente

## 🎯 Objetivos

- Conectar un cliente Socket.io al servidor
- Emitir y escuchar eventos desde el cliente
- Manejar reconexión y errores de conexión
- Pasar el token JWT al conectar para autenticación

---

## 1. Instalación del Cliente

```bash
# En el proyecto frontend (React, Vue, plain HTML…)
pnpm add socket.io-client@4.8.1

# Para tests de integración en el backend
pnpm add -D socket.io-client@4.8.1
```

> En el **backend** de este bootcamp, `socket.io-client` se usa solo para pruebas
> de integración. Para aplicaciones frontend reales se instala en el proyecto cliente.

---

## 2. Conexión Básica

```ts
// frontend/src/socket.ts
import { io, Socket } from 'socket.io-client';

// Conectar al servidor (sin autenticación)
const socket: Socket = io('http://localhost:3000', {
  transports: ['websocket'], // forzar WebSocket desde el inicio, sin polling
  autoConnect: true,         // conectar automáticamente al instanciar
});

socket.on('connect', () => {
  console.log('✅ Conectado, id:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Desconectado:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Error al conectar:', error.message);
});
```

---

## 3. Conexión con Autenticación JWT

Cuando el servidor usa `io.use()` para validar JWT, el token debe enviarse en
el objeto `auth` de las opciones de conexión:

```ts
// frontend/src/socket.ts
import { io, Socket } from 'socket.io-client';

function createAuthSocket(token: string): Socket {
  return io('http://localhost:3000', {
    auth: { token },           // ← El servidor lo lee en socket.handshake.auth.token
    transports: ['websocket'],
    autoConnect: false,        // Conectar manualmente para controlar el ciclo de vida
  });
}

// Uso después del login:
const token = localStorage.getItem('accessToken') ?? '';
const socket = createAuthSocket(token);

socket.on('connect_error', (error) => {
  // Si el servidor rechaza el token, recibiremos este error
  if (error.message === 'auth_error') {
    console.error('Token inválido — redirigir al login');
    socket.disconnect();
  }
});

// Conectar explícitamente
socket.connect();
```

---

## 4. Emitir y Escuchar Eventos

```ts
// Emitir un evento al servidor
socket.emit('joinRoom', { username: 'Alice', room: 'general' });

// Emitir con datos
socket.emit('sendMessage', { text: '¡Hola mundo!', room: 'general' });

// Escuchar eventos del servidor
socket.on('message', (data) => {
  console.log(`[${data.room}] ${data.username}: ${data.text}`);
  renderMessage(data);
});

socket.on('userJoined', (data) => {
  console.log(`${data.username} se unió a ${data.room}`);
});

socket.on('userLeft', (data) => {
  console.log(`${data.username} salió de ${data.room}`);
});

// Eliminar listener cuando ya no se necesita (evita memory leaks)
socket.off('message');
```

---

## 5. Tipos en el Cliente

El cliente también soporta tipado con las mismas interfaces del servidor:

```ts
import { io, Socket } from 'socket.io-client';
import type { ServerToClientEvents, ClientToServerEvents } from '../types';

// Tipos invertidos en el cliente: Server↔Client se invierten
type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const socket: AppSocket = io('http://localhost:3000', {
  auth: { token: getToken() },
});

// Ahora TypeScript valida los eventos
socket.emit('sendMessage', { text: 'Hola', room: 'general' }); // ✅
socket.emit('sendMessage', { txt: 'Hola' }); // ❌ TypeScript error
```

---

## 6. Ciclo de Vida y Reconexión

Socket.io client incluye reconexión automática con backoff exponencial:

```ts
const socket = io('http://localhost:3000', {
  auth: { token },
  reconnection: true,          // default: true
  reconnectionAttempts: 5,     // intentos antes de rendirse
  reconnectionDelay: 1000,     // ms antes del primer reintento
  reconnectionDelayMax: 5000,  // máximo ms entre reintentos
});

socket.io.on('reconnect', (attempt) => {
  console.log(`Reconectado después de ${attempt} intento(s)`);
});

socket.io.on('reconnect_error', (error) => {
  console.error('Error de reconexión:', error);
});

socket.io.on('reconnect_failed', () => {
  console.error('No se pudo reconectar después de todos los intentos');
  showOfflineBanner();
});
```

---

## 7. Pruebas de Integración con socket.io-client

Desde el backend podemos crear un cliente Socket.io para tests:

```ts
// __tests__/chat.integration.test.ts
import { createServer } from 'http';
import { Server } from 'socket.io';
import { io as ioc, Socket } from 'socket.io-client';

describe('Chat WebSocket', () => {
  let ioServer: Server;
  let clientSocket: Socket;
  const PORT = 3099;

  beforeAll((done) => {
    const httpServer = createServer();
    ioServer = new Server(httpServer);

    // Configurar handlers del servidor…
    ioServer.on('connection', (socket) => {
      socket.on('sendMessage', (data) => {
        ioServer.emit('message', { ...data, id: '1' });
      });
    });

    httpServer.listen(PORT, () => {
      clientSocket = ioc(`http://localhost:${PORT}`);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.disconnect();
  });

  it('recibe el mensaje emitido', (done) => {
    clientSocket.emit('sendMessage', { text: 'test', room: 'general' });
    clientSocket.on('message', (data) => {
      expect(data.text).toBe('test');
      done();
    });
  });
});
```

---

## ✅ Checklist de Verificación

- [ ] Token JWT enviado en `auth.token` al conectar, nunca en query string
- [ ] Evento `connect_error` manejado para tokens rechazados
- [ ] Listeners eliminados con `socket.off()` cuando no se necesitan
- [ ] `autoConnect: false` cuando la conexión debe ser controlada

---

## 📚 Recursos Adicionales

- [Socket.io — Client API](https://socket.io/docs/v4/client-api/)
- [Socket.io — Client Installation](https://socket.io/docs/v4/client-installation/)
