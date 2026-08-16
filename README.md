# 🎪 Semana 02 — Servidor Express HTTP REST API (Productora de Eventos)

## 📋 Descripción del Proyecto

Proyecto entregable de la **Semana 02** para el Bootcamp **bc-expressjs**, adaptado 100% al dominio asignado: **Productora de Eventos**.

En esta semana se transforma de forma incremental la base CLI de la Semana 01 en un **servidor HTTP REST API completo con Express 5 y TypeScript**. La API gestiona el recurso principal del dominio (`events`), implementa un Store en memoria, aplica la cadena de middlewares (parseo JSON, logger de solicitudes con métricas de tiempo, manejador 404 y manejador global de errores) y cuenta con apagado suave (*graceful shutdown*).

---

## 🏢 Entidad del Dominio: `Event`

- `id`: Identificador único del evento (ej: `EVT-001`)
- `name`: Nombre descriptivo del evento
- `category`: Categoría (`concierto`, `boda`, `conferencia`, `corporativo`, `festival`, `exposicion`)
- `price`: Presupuesto asignado / costo total del evento en **Pesos Colombianos (COP)**
- `capacity`: Aforo máximo estimado de asistentes
- `active`: Estado del evento (`true` = confirmado, `false` = cancelado)
- `location`: Recinto o locación del evento
- `date`: Fecha programada (ISO 8601)

---

## 🛣️ Especificación de Endpoints REST API

| Método | Ruta | Descripción | Código HTTP |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Chequeo de salud e información del servicio | `200 OK` |
| `GET` | `/api/v1/events` | Listar todos los eventos (soporta filtros `?category=`, `?active=`, `?search=`) | `200 OK` |
| `GET` | `/api/v1/events/:id` | Obtener detalle de un evento por ID | `200 OK` / `404 Not Found` |
| `POST` | `/api/v1/events` | Crear/Registrar un nuevo evento en la Productora | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/v1/events/:id` | Actualización completa de un evento existente | `200 OK` / `404 Not Found` / `400 Bad Request` |
| `DELETE` | `/api/v1/events/:id` | Eliminar un evento | `204 No Content` / `404 Not Found` |

---

## ⚙️ Middlewares Implementados

1. **`express.json()`**: Parseo de cuerpos de solicitud en formato JSON.
2. **Logger de Solicitudes HTTP**: Captura timestamp, método HTTP, URL original, código de estado devuelto y tiempo de ejecución en milisegundos (`ms`).
3. **Handler 404**: Captura cualquier ruta o método no definido devolviendo una respuesta JSON estructurada.
4. **Global Error Handler**: Capturador centralizado de excepciones con firma de 4 parámetros `(err, req, res, next)`.

---

## 🚀 Instrucciones de Ejecución

```bash
# 1. Instalar dependencias con pnpm
pnpm install

# 2. Verificar compilación de TypeScript
pnpm build

# 3. Arrancar en modo desarrollo con recarga automática
pnpm dev

# 4. Arrancar en modo producción
pnpm start
```

---

## 🧪 Pruebas de Endpoints con `curl`

```bash
# 1. Listar todos los eventos
curl http://localhost:3000/api/v1/events

# 2. Filtrar por categoría
curl "http://localhost:3000/api/v1/events?category=concierto"

# 3. Obtener por ID
curl http://localhost:3000/api/v1/events/EVT-001

# 4. Crear un nuevo evento (Presupuesto en COP)
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gran Gala Corporativa Innovación 2026",
    "category": "corporativo",
    "price": 45000000,
    "capacity": 500,
    "active": true,
    "location": "Hotel Grand Hyatt, Bogotá",
    "date": "2026-11-20T19:00:00.000Z"
  }'

# 5. Actualizar evento existente
curl -X PUT http://localhost:3000/api/v1/events/EVT-001 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 90000000,
    "capacity": 18000
  }'

# 6. Eliminar un evento (esperado: 204 No Content)
curl -i -X DELETE http://localhost:3000/api/v1/events/EVT-001
```
