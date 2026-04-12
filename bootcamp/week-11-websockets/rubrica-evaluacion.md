# Rúbrica de Evaluación — Semana 11: WebSockets con Socket.io

## 📊 Distribución de Evidencias

| Evidencia | Tipo | Peso |
|-----------|------|------|
| Evaluación teórica | Conocimiento 🧠 | 30 % |
| Ejercicios prácticos | Desempeño 💪 | 40 % |
| Proyecto semanal | Producto 📦 | 30 % |

---

## 🧠 Conocimiento (30 %)

### Preguntas de Evaluación

1. ¿Cuál es la principal diferencia entre HTTP y el protocolo WebSocket en términos de conexión?
2. ¿Qué código de estado HTTP indica que la conexión fue actualizada a WebSocket?
3. ¿Para qué sirve `io.on('connection', callback)` en Socket.io?
4. Explica la diferencia entre `socket.emit()`, `io.emit()` y `socket.to(room).emit()`.
5. ¿Qué es un **room** en Socket.io y cómo se une un socket a uno?
6. ¿Qué es un **namespace** y cuándo se usa en lugar de rooms?
7. ¿Dónde se coloca el JWT al conectar un cliente Socket.io para autenticación?
8. ¿Qué función cumple `io.use()` en Socket.io?
9. ¿Qué contiene `socket.handshake.auth` y cómo se usa para autenticar?
10. ¿Qué es un **personal room** y para qué sirve en sistemas de notificaciones?

### Criterios de Puntuación

| Rango | Puntos | Descripción |
|-------|--------|-------------|
| 9-10 correctas | 90-100 | Dominio completo del protocolo y Socket.io |
| 7-8 correctas | 70-80 | Buen manejo con lagunas menores |
| 5-6 correctas | 50-60 | Comprensión básica, necesita refuerzo |
| < 5 correctas | < 50 | Requiere revisión del material teórico |

---

## 💪 Desempeño (40 %)

### Ejercicio 01: Chat Básico con Rooms (20 pts)

| Criterio | Pts | Indicador de Logro |
|----------|-----|--------------------|
| PASO 1: Socket.io inicializado con HTTP server | 4 | `const io = new Server(httpServer, { cors })` funcional |
| PASO 2: Evento `sendMessage` broadcast a sala | 4 | `io.to(room).emit('message', data)` correcto |
| PASO 3: Evento `joinRoom` con join + notificación | 6 | `socket.join(room)`, `socket.to(room).emit('userJoined')` |
| PASO 4: Manejo de disconnect con limpieza | 6 | `socket.on('disconnect')` notifica sala correctamente |

### Ejercicio 02: Autenticación WebSocket (20 pts)

| Criterio | Pts | Indicador de Logro |
|----------|-----|--------------------|
| PASO 1: Middleware `io.use()` extrae y verifica JWT | 6 | Token inválido rechaza con `next(new Error(...))` |
| PASO 2: `socket.data.user` disponible en handlers | 4 | Eventos usan datos del usuario autenticado |
| PASO 3: Personal room `user:${userId}` al conectar | 6 | `socket.join('user:' + userId)` ejecutado en connect |
| PASO 4: Middleware registrado en server.ts | 4 | `io.use(authWsMiddleware)` antes de `io.on('connection')` |

---

## 📦 Producto (30 %)

### Proyecto Semanal: Sistema de Notificaciones RT

Puntuación total: **100 puntos**

| Criterio | Pts | Indicador de Logro |
|----------|-----|--------------------|
| Socket.io integrado con Express HTTP server | 8 | Servidor inicia sin errores, acepta conexiones WS |
| Middleware JWT en WebSocket funcional | 12 | Conexiones sin token son rechazadas |
| Personal rooms: emit a usuario específico | 10 | `io.to('user:' + userId).emit(...)` funcional |
| Notificación creada al registrar nuevo ítem | 12 | Evento `notification:new` recibido en tiempo real |
| Notificaciones persistidas en MongoDB | 8 | Modelo `Notification` guardado correctamente |
| Endpoint REST para listar notificaciones | 8 | `GET /api/v1/notifications` retorna lista paginada |
| Endpoint REST para marcar como leída | 8 | `PATCH /api/v1/notifications/:id/read` funciona |
| Endpoint REST para contador de no leídas | 6 | `GET /api/v1/notifications/unread/count` correcto |
| Código adaptado al dominio asignado | 8 | Ítem, modelo y templates coherentes con el dominio |
| README con instrucciones y ejemplos | 8 | Explica eventos WS y endpoints REST disponibles |
| Pruebas con Postman + cliente WS (Thunder/wscat) | 12 | Capturas que demuestran funcionalidad completa |

### Desglose por Nivel

| Nivel | Puntos | Descripción |
|-------|--------|-------------|
| Excelente | 90-100 | Todos los requisitos cumplidos, código limpio, pruebas completas |
| Bueno | 75-89 | La mayoría de requisitos cumplidos, detalles menores faltantes |
| Satisfactorio | 60-74 | Funcionalidad core presente, elementos opcionales faltantes |
| Necesita mejora | < 60 | Funcionalidad incompleta o errores críticos |

---

## ✅ Criterios Transversales

- [ ] Tipos TypeScript explícitos en interfaces de eventos Socket.io
- [ ] Manejo de errores en WebSocket (disconnect sin crash del servidor)
- [ ] Código adaptado coherentemente al dominio asignado
- [ ] Variables sensibles en `.env` (nunca hardcodeadas)
- [ ] JWT verificado antes de permitir cualquier evento autenticado
