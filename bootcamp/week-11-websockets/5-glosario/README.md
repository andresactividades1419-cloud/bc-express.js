# Glosario — Semana 11: WebSockets con Socket.io

---

## A

**Acknowledgement (ack)**
Confirmación de recepción de un evento Socket.io. El emisor puede pasar un callback
como último argumento y el receptor lo llama para confirmar:
`socket.emit('event', data, (response) => { ... })`.

---

## B

**Bidireccional**
Ver **Full-duplex**. Capacidad de una conexión para enviar y recibir datos
simultáneamente en ambas direcciones sin esperar turno.

**Broadcasting**
Enviar un mensaje a múltiples clientes a la vez. En Socket.io:
- `socket.broadcast.emit()` — a todos excepto el emisor.
- `io.emit()` — a todos los clientes conectados.
- `io.to(room).emit()` — a todos en una sala.

---

## C

**connect_error**
Evento que el cliente Socket.io recibe cuando el servidor rechaza la conexión.
Ocurre cuando el middleware `io.use()` llama `next(new Error(...))`.

**Conexión TCP persistente**
Base técnica del protocolo WebSocket. A diferencia de HTTP que cierra la conexión
después de cada respuesta, WebSocket mantiene el canal TCP abierto indefinidamente.

---

## D

**Disconnect (evento)**
Evento emitido automáticamente por Socket.io cuando un cliente pierde la conexión,
cierra el tab, llama `socket.disconnect()` o hay un error de red.
`socket.on('disconnect', (reason) => { ... })`.

---

## E

**Emit**
Enviar un evento con datos desde un socket. Puede ser del cliente al servidor
o viceversa: `socket.emit('nombreEvento', datos)`.

**Event-driven**
Paradigma de programación basado en eventos. Socket.io funciona sobre este modelo:
los participantes declaran qué eventos escuchan (`on`) y cuáles emiten (`emit`).

---

## F

**Full-duplex**
Modo de comunicación donde ambos extremos pueden enviar y recibir datos
simultáneamente. WebSocket es full-duplex; HTTP tradicional es half-duplex
(cliente pregunta → servidor responde).

---

## H

**Handshake**
Proceso de negociación inicial para establecer una conexión WebSocket.
El cliente envía un HTTP Upgrade request y el servidor responde con
`101 Switching Protocols`. Después, la comunicación es WebSocket nativo.

**HTTP Upgrade**
Header HTTP que solicita cambiar el protocolo de la conexión actual:
`Connection: Upgrade`, `Upgrade: websocket`.

---

## I

**io**
Instancia del servidor Socket.io. Se usa para emitir a todos los clientes
o a salas específicas desde fuera de los handlers de conexión:
`io.emit()`, `io.to(room).emit()`.

---

## L

**Long-polling**
Técnica donde el cliente hace un HTTP request y el servidor lo mantiene
abierto hasta tener datos que enviar. Menos eficiente que WebSocket
porque crea una nueva conexión por cada actualización.

---

## M

**Middleware (io.use())**
Función que se ejecuta una vez por nueva conexión WebSocket, antes del
evento `connection`. Usada para autenticación con JWT.
Firma: `io.use((socket, next) => { ... })`.

---

## N

**Namespace**
División lógica del servidor Socket.io que actúa como un sub-servidor
separado. Cada namespace tiene su propio sistema de rooms y eventos.
Por defecto se usa `/`. Se crea con `io.of('/nombre')`.

---

## P

**Personal Room**
Room cuyo nombre es único por usuario, convencionalmente `user:${userId}`.
Permite emitir a un usuario específico desde cualquier parte del servidor:
`io.to('user:abc123').emit(...)`.

**Polling**
Técnica donde el cliente pregunta al servidor repetidamente cada N segundos
si hay datos nuevos. Ineficiente porque la mayoría de requests son innecesarias.

**Pub/Sub**
Patrón de mensajería donde los publicadores emiten mensajes a un canal (topic)
y los suscriptores los reciben sin conocerse entre sí. Socket.io rooms implementan
una forma simplificada de pub/sub.

---

## R

**Reconexión automática**
Socket.io client reintenta conectar automáticamente si pierde la conexión,
con backoff exponencial. Configurable con `reconnectionAttempts` y `reconnectionDelay`.

**Room**
Grupo dinámico de sockets dentro de un namespace. Los sockets se unen con
`socket.join(room)` y se van con `socket.leave(room)`. Permiten envíos dirigidos:
`io.to(room).emit()`.

---

## S

**Socket**
Objeto que representa una conexión individual entre el servidor y un cliente.
Tiene un `id` único, data persistente (`socket.data`), y métodos para emitir
y escuchar eventos.

**socket.data**
Objeto adjunto al socket para almacenar datos de sesión que persisten durante
la conexión. En este bootcamp se usa para guardar el usuario autenticado:
`socket.data.user = payload`.

**socket.handshake**
Objeto con metadatos de la conexión WebSocket inicial: headers, query params,
dirección IP y el objeto `auth` enviado por el cliente.

---

## T

**TypedServer / TypedSocket**
Alias de tipos TypeScript para `Server` y `Socket` con los genéricos de eventos
configurados. Permite autocompletado y validación en tiempo de compilación.

---

## W

**WebSocket**
Protocolo de comunicación (RFC 6455) que permite una conexión persistente,
bidireccional y full-duplex entre cliente y servidor sobre TCP.
Usa `ws://` (inseguro) o `wss://` (sobre TLS, equivalente a HTTPS).

**wss://**
WebSocket Secure. WebSocket cifrado con TLS, análogo a HTTPS para HTTP.
Siempre usar `wss://` en producción.

---

## 101

**101 Switching Protocols**
Código de estado HTTP que el servidor envía al cliente para confirmar
el upgrade a WebSocket. Después de esta respuesta, el protocolo HTTP
queda en segundo plano.
