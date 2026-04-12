# Proyecto Semanal: Sistema de Notificaciones en Tiempo Real

## 🎯 Objetivo

Construir una API REST + WebSocket que combine autenticación JWT, persistencia
con MongoDB y notificaciones en tiempo real con Socket.io.
Cuando se crea un nuevo recurso (ítem), el usuario propietario recibe
una notificación instantánea si está conectado vía WebSocket.

---

## 🏛️ Tu Dominio Asignado

**Dominio**: El instructor te asignará tu dominio antes de comenzar.

El campo `item` en este proyecto representa el recurso principal de tu dominio:

| Dominio | Ítem principal |
|---------|----------------|
| Biblioteca | Libro |
| Farmacia | Medicamento |
| Gimnasio | Rutina |
| Restaurante | Platillo |
| Tienda de mascotas | Producto |
| Hotel | Reserva |

Adapta los nombres de modelos, campos y mensajes de notificación a tu dominio.

---

## 🏗️ Arquitectura

```
Cliente HTTP (Postman)          Cliente WebSocket (Thunder/wscat)
        │                                    │
        ▼                                    ▼
 POST /api/v1/items              io('http://localhost:3000',
        │                              { auth: { token } })
        ▼                                    │
  Express (REST API)            Socket.io + JWT middleware
        │                                    │
        ▼                                    ▼
  ItemsService                    io.on('connection')
        │                           socket.join('user:' + userId)
        ▼                                    │
NotificationsService ───────────────────────►│
   io.to('user:' + userId)        cliente recibe 'notification:new'
      .emit('notification:new')
        │
        ▼
    MongoDB (Mongoose)
  (Notification guardada)
```

---

## ✅ Requisitos Funcionales (Adaptables a tu dominio)

### REST API

1. **POST** `/api/v1/auth/register` — Registrar usuario
2. **POST** `/api/v1/auth/login` — Login, devuelve `accessToken`
3. **GET** `/api/v1/items` — Listar ítems (requiere auth)
4. **POST** `/api/v1/items` — Crear ítem → dispara notificación WS al creador
5. **GET** `/api/v1/notifications` — Listar mis notificaciones (requiere auth)
6. **PATCH** `/api/v1/notifications/:id/read` — Marcar notificación como leída
7. **GET** `/api/v1/notifications/unread/count` — Contador de no leídas

### WebSocket

- Conectar con token JWT en `auth: { token }`
- Recibir evento `notification:new` cuando se crea un ítem
- Las conexiones sin token son rechazadas

---

## 💡 Ejemplos de Adaptación por Dominio

### Biblioteca
```ts
// Item = Libro
{ title: 'El Principito', author: 'Saint-Exupéry', isbn: '978-...' }
// Notificación: "El libro 'El Principito' fue agregado al catálogo"
```

### Farmacia
```ts
// Item = Medicamento
{ name: 'Paracetamol 500mg', stock: 100, price: 5.99 }
// Notificación: "El medicamento 'Paracetamol 500mg' fue registrado"
```

### Gimnasio
```ts
// Item = Rutina
{ name: 'Fuerza Upper Body', duration: 60, level: 'intermediate' }
// Notificación: "La rutina 'Fuerza Upper Body' fue publicada"
```

---

## 🚀 Instalación y Configuración

```bash
cd starter
pnpm install
cp .env.example .env
# Editar .env con tu MongoDB URI y JWT secret
pnpm dev
```

Necesitas MongoDB corriendo. Opciones:
- **Docker**: `docker run -d -p 27017:27017 --name mongo mongo:8`
- **MongoDB Atlas**: usa la URI de conexión en `.env`

---

## 🛠️ Entregables

1. API funcional con capturas de Postman (o Thunder Client) demostrando:
   - Registro y login
   - Crear ítem y recibir notificación WS en tiempo real
   - Listar y marcar notificaciones como leídas
2. Cliente WebSocket conectado con token válido recibiendo `notification:new`
3. README.md actualizado describiendo tu dominio y los campos del ítem

---

## 📁 Estructura del Proyecto

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── config/env.ts
    ├── types/index.ts              ← Socket.io typed events + TokenPayload
    ├── errors/AppError.ts
    ├── models/
    │   ├── user.model.ts           ← Dado
    │   ├── item.model.ts           ← TODO: adaptar a tu dominio
    │   └── notification.model.ts  ← TODO: implementar
    ├── validators/
    │   ├── auth.schema.ts          ← Dado
    │   └── item.schema.ts          ← TODO: adaptar a tu dominio
    ├── repositories/
    │   ├── users.repository.ts     ← Dado
    │   ├── items.repository.ts     ← TODO: implementar
    │   └── notifications.repository.ts ← TODO: implementar
    ├── middlewares/
    │   ├── auth.middleware.ts      ← Dado (JWT para REST)
    │   ├── auth.ws.ts              ← TODO: implementar io.use()
    │   └── error.middleware.ts     ← Dado
    ├── utils/jwt.ts                ← Dado
    ├── services/
    │   ├── auth.service.ts         ← Dado
    │   ├── items.service.ts        ← TODO: integrar notificaciones
    │   └── notifications.service.ts ← TODO: implementar
    ├── controllers/
    │   ├── auth.controller.ts      ← Dado
    │   ├── items.controller.ts     ← TODO: implementar
    │   └── notifications.controller.ts ← TODO: implementar
    ├── routes/
    │   ├── auth.routes.ts          ← Dado
    │   ├── items.routes.ts         ← TODO: implementar
    │   └── notifications.routes.ts ← TODO: implementar
    ├── handlers/
    │   └── notifications.handler.ts ← TODO: eventos WS opcionales
    ├── app.ts                      ← Dado (registrar nuevos routers)
    └── server.ts                   ← TODO: Socket.io + io export
```
