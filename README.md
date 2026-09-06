# Semana 03 — API REST con Arquitectura en 4 Capas (Productora de Eventos)

## Descripcion del Proyecto

Proyecto entregable de la **Semana 03** para el Bootcamp **bc-expressjs**, adaptado 100% al dominio asignado: **Productora de Eventos**.

En esta semana se refactoriza y evoluciona la aplicacion aplicando una **arquitectura desacoplada en 4 capas**:
`routes → controllers → services → repositories`, garantizando el principio de responsabilidad unica (SRP), contratos de respuesta consistentes con envoltura `data`, paginacion en consultas de colecciones y tipado estricto con TypeScript.

---

## Arquitectura en 4 Capas

1. **Routes (`src/routes/events.routes.ts`):** Mapea exclusivamente los metodos HTTP y rutas hacia las funciones del controlador. No contiene logica de negocio ni acceso a datos.
2. **Controllers (`src/controllers/events.controller.ts`):** Thin controllers que ejecutan un patron estricto de 3 pasos:
   - Extraer parametros y cuerpo de la solicitud (`req.params`, `req.query`, `req.body`).
   - Invocar el metodo correspondiente en la capa de servicio.
   - Emitir la respuesta HTTP con el codigo de estado correspondiente (`200`, `201`, `204`, `404`) o delegar excepciones a `next(err)`.
3. **Services (`src/services/events.service.ts`):** Capa de logica de negocio y reglas del dominio. No tiene dependencias de Express (`req`/`res`). Maneja la paginacion y validaciones. Retorna `undefined` cuando un recurso no existe.
4. **Repositories (`src/repositories/events.repository.ts`):** Unica capa con acceso directo al almacenamiento en memoria. Todos sus metodos son asincronos (`Promise<T>`) y retornan copias defensivas para evitar mutaciones externas del estado.

---

## Entidad del Dominio: `Event`

- `id`: Identificador numerico auto-incremental del evento.
- `name`: Nombre descriptivo del evento (ej: `Festival Estereo Picnic 2026`).
- `category`: Categoria (`concierto`, `boda`, `conferencia`, `corporativo`, `festival`, `exposicion`).
- `price`: Presupuesto asignado / costo total del evento en **Pesos Colombianos (COP)**.
- `capacity`: Aforo maximo estimado de asistentes.
- `active`: Estado del evento (`true` = confirmado, `false` = inactivo/cancelado).
- `location`: Recinto o locacion del evento.
- `date`: Fecha programada (ISO 8601).
- `createdAt`: Timestamp de registro del evento (ISO 8601).

---

## Especificacion de Endpoints REST API

| Metodo | Ruta | Descripcion | Codigo Exitoso | Codigo Error |
| :--- | :--- | :--- | :---: | :---: |
| `GET` | `/health` | Verificacion de salud del servicio | `200 OK` | `500` |
| `GET` | `/api/v1/events` | Listado paginado (`?page=&limit=`) | `200 OK` | `500` |
| `GET` | `/api/v1/events/:id` | Detalle de un evento por ID | `200 OK` | `404 Not Found` |
| `POST` | `/api/v1/events` | Registrar un nuevo evento en la Productora | `201 Created` | `400 / 500` |
| `PUT` | `/api/v1/events/:id` | Actualizacion parcial o total del evento | `200 OK` | `404 / 400` |
| `DELETE` | `/api/v1/events/:id` | Eliminar un evento | `204 No Content` | `404 Not Found` |

---

## Contratos de Respuesta Estandarizados

### Listado Paginado (`GET /api/v1/events?page=1&limit=2`)
```json
{
  "data": [
    {
      "id": 1,
      "name": "Festival Estereo Picnic 2026",
      "category": "festival",
      "price": 185000000,
      "capacity": 45000,
      "active": true,
      "location": "Parque Simon Bolivar, Bogota",
      "date": "2026-03-27T14:00:00.000Z",
      "createdAt": "2026-01-10T10:00:00.000Z"
    }
  ],
  "total": 6,
  "page": 1,
  "limit": 2
}
```

### Recurso Individual (`GET /api/v1/events/1`)
```json
{
  "data": {
    "id": 1,
    "name": "Festival Estereo Picnic 2026",
    "category": "festival",
    "price": 185000000,
    "capacity": 45000,
    "active": true,
    "location": "Parque Simon Bolivar, Bogota",
    "date": "2026-03-27T14:00:00.000Z",
    "createdAt": "2026-01-10T10:00:00.000Z"
  }
}
```

### Recurso No Encontrado (`GET /api/v1/events/999`)
```json
{
  "error": "Not Found",
  "message": "Event 999 not found"
}
```

---

## Estructura del Proyecto

```
./
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts
    ├── server.ts
    ├── types.ts
    ├── controllers/
    │   └── events.controller.ts
    ├── repositories/
    │   └── events.repository.ts
    ├── routes/
    │   └── events.routes.ts
    └── services/
        └── events.service.ts
```

---

## Instrucciones de Ejecucion

```bash
# 1. Instalar dependencias con pnpm
pnpm install

# 2. Compilar TypeScript y verificar tipos estrictos
pnpm build

# 3. Arrancar servidor en modo desarrollo
pnpm dev

# 4. Arrancar en produccion (requiere build previo)
pnpm start
```

---

## Pruebas de Endpoints con curl

```bash
# 1. Health check
curl http://localhost:3000/health

# 2. Listar eventos con paginacion
curl "http://localhost:3000/api/v1/events?page=1&limit=3"

# 3. Obtener evento por ID
curl http://localhost:3000/api/v1/events/1

# 4. Caso de error 404
curl http://localhost:3000/api/v1/events/999

# 5. Crear un nuevo evento (Presupuesto en COP)
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gran Concierto de Jazz al Parque",
    "category": "concierto",
    "price": 42000000,
    "capacity": 12000,
    "active": true,
    "location": "Parque El Country, Bogota",
    "date": "2026-09-19T17:00:00.000Z"
  }'

# 6. Actualizar evento existente
curl -X PUT http://localhost:3000/api/v1/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 195000000,
    "capacity": 50000
  }'

# 7. Eliminar evento (esperado: 204 No Content)
curl -i -X DELETE http://localhost:3000/api/v1/events/1
```
