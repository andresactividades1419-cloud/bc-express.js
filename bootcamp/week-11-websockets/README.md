# Semana 11: WebSockets con Socket.io

Comunicación bidireccional en tiempo real. En esta semana aprenderás a construir
servidores con Socket.io sobre Express, gestionar rooms y namespaces, autenticar
conexiones WebSocket con JWT y aplicar patrones pub/sub para notificaciones en vivo.

---

## 🎯 Objetivos de aprendizaje

Al finalizar esta semana serás capaz de:

- Explicar las diferencias entre HTTP tradicional y el protocolo WebSocket
- Instalar y configurar un servidor Socket.io integrado con Express
- Gestionar eventos de conexión, desconexión y mensajes personalizados
- Organizar clientes en **rooms** para comunicación en grupos
- Usar **namespaces** para aislar contextos de la aplicación
- Implementar autenticación JWT en conexiones Socket.io con `io.use()`
- Emitir eventos a usuarios específicos mediante **personal rooms**
- Aplicar el patrón publish/subscribe para notificaciones en tiempo real

---

## 📚 Requisitos previos

| Semana | Tema | Conceptos necesarios |
|--------|------|----------------------|
| Semana 02 | Express Intro | Servidor HTTP, middleware, req/res |
| Semana 07 | Autenticación JWT | JWT generation, `jwt.verify()`, `Bearer` tokens |
| Semana 08 | Autorización | Middleware de autenticación, roles |

---

## 🗂️ Estructura de la semana

```
week-11-websockets/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-websocket-handshake.svg
│   ├── 02-rooms-namespaces.svg
│   └── 03-jwt-auth-flow.svg
├── 1-teoria/
│   ├── 01-websockets-fundamentos.md
│   ├── 02-socketio-servidor.md
│   ├── 03-socketio-cliente.md
│   └── 04-autenticacion-ws.md
├── 2-practicas/
│   ├── ejercicio-01-chat-basico/
│   └── ejercicio-02-autenticacion-ws/
├── 3-proyecto/
│   ├── README.md
│   └── starter/
├── 4-recursos/
│   ├── ebook-free/
│   ├── videografia/
│   └── webgrafia/
└── 5-glosario/
    └── README.md
```

---

## 📝 Contenidos

### 1-teoria/

| Archivo | Tema |
|---------|------|
| [01-websockets-fundamentos.md](1-teoria/01-websockets-fundamentos.md) | Protocolo WebSocket, handshake HTTP, full-duplex |
| [02-socketio-servidor.md](1-teoria/02-socketio-servidor.md) | Socket.io Server, rooms, events, namespaces |
| [03-socketio-cliente.md](1-teoria/03-socketio-cliente.md) | Socket.io Client, eventos, reconnection |
| [04-autenticacion-ws.md](1-teoria/04-autenticacion-ws.md) | JWT en WebSockets, `io.use()`, personal rooms |

### 2-practicas/

| Ejercicio | Descripción |
|-----------|-------------|
| [ejercicio-01-chat-basico](2-practicas/ejercicio-01-chat-basico/README.md) | Chat en tiempo real con rooms — Multer sin autenticación |
| [ejercicio-02-autenticacion-ws](2-practicas/ejercicio-02-autenticacion-ws/README.md) | Middleware JWT para Socket.io, eventos protegidos |

---

## ⏱️ Distribución del tiempo (8 horas)

| Actividad | Tiempo |
|-----------|--------|
| Teoría: protocolo WebSocket y Socket.io | 2 h |
| Ejercicio 01: Chat básico con rooms | 1.5 h |
| Ejercicio 02: Autenticación WS con JWT | 1.5 h |
| Proyecto semanal: Sistema de notificaciones RT | 3 h |

---

## 📌 Entregables

1. **Ejercicio 01** completado: chat en tiempo real con rooms funcional
2. **Ejercicio 02** completado: middleware JWT en Socket.io, eventos protegidos
3. **Proyecto semanal**: sistema de notificaciones en tiempo real aplicado al dominio asignado

---

## 🔗 Navegación

← [Semana 10: Uploads y Emails](../week-10-uploads_emails/README.md) &nbsp;|&nbsp; [Semana 12: Caching y Performance](../week-12-caching_performance/README.md) →
