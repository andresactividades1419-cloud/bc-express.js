# Semana 04 — Validacion, Manejo de Errores y Logging Profesional (Productora de Eventos)

## Descripcion del Proyecto

Proyecto entregable de la **Semana 04** para el Bootcamp **bc-expressjs**, adaptado 100% al dominio asignado: **Productora de Eventos**.

En esta semana se profundiza en la robustez y calidad de produccion de la API REST mediante tres pilares fundamentales:
1. **Validacion declarativa de esquemas con Zod**: verificacion rigurosa de tipos, rangos y campos obligatorios tanto en cuerpos de solicitud (`createEventSchema`, `updateEventSchema`) como en parametros de ruta (`:id`).
2. **Manejo estructurado de errores**: creacion y uso de la clase operacional `AppError`, middleware de captura de rutas no encontradas (`notFound`) y manejador centralizado de errores (`errorHandler`) con firma de 4 parametros para discriminar `ZodError` (400), `AppError` (status correspondiente) y errores no controlados (500).
3. **Logging profesional con Winston y Morgan**: reemplazo total de `console.log` por registros estructurados con niveles semanticos (`http`, `info`, `warn`, `error`), formato colorizado en desarrollo y JSON con salida a archivo `logs/error.log` en produccion.

---

## Dominio Asignado y Entidad: `Event`

- `id`: Identificador numerico entero positivo del evento.
- `name`: Nombre descriptivo del evento (obligatorio, no vacio).
- `category`: Categoria permitida (`concierto`, `boda`, `conferencia`, `corporativo`, `festival`, `exposicion`).
- `price`: Presupuesto asignado / costo total del evento en **Pesos Colombianos (COP)** (numero positivo obligatorio).
- `capacity`: Aforo maximo estimado de asistentes (entero no negativo, valor por defecto 100).
- `active`: Estado del evento (`true` = confirmado, `false` = inactivo/cancelado, valor por defecto `true`).
- `location`: Recinto o locacion del evento (obligatorio, no vacio).
- `date`: Fecha programada del evento (ISO 8601).
- `createdAt`: Fecha de registro generada automaticamente.

---

## Esquemas de Validacion Zod (`src/schemas/event.schema.ts`)

```ts
export const createEventSchema = z.object({
  name: z.string({ required_error: 'name es obligatorio' }).min(1, 'name no puede estar vacío').trim(),
  category: z.enum(
    ['concierto', 'boda', 'conferencia', 'corporativo', 'festival', 'exposicion'],
    { errorMap: () => ({ message: 'category no válida. Permitidas: concierto, boda, conferencia, corporativo, festival, exposicion' }) }
  ),
  price: z.number({ required_error: 'price es obligatorio' }).positive('El presupuesto asignado (price) en COP debe ser mayor a 0'),
  capacity: z.number().int('El aforo (capacity) debe ser un número entero').nonnegative('El aforo no puede ser negativo').default(100),
  active: z.boolean().default(true),
  location: z.string({ required_error: 'location es obligatoria' }).min(1, 'location no puede estar vacía').trim(),
  date: z.string({ required_error: 'date es obligatoria' }).min(1, 'date no puede estar vacía'),
});

export const updateEventSchema = createEventSchema.partial();
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
```

---

## Especificacion de Endpoints REST API

| Metodo | Ruta | Descripcion | Codigo Exitoso | Codigo Error |
| :--- | :--- | :--- | :---: | :---: |
| `GET` | `/health` | Verificacion de salud del servicio | `200 OK` | `500` |
| `GET` | `/api/v1/events` | Listado paginado (`?page=&limit=`) | `200 OK` | `500` |
| `GET` | `/api/v1/events/:id` | Detalle de un evento por ID validado | `200 OK` | `400 / 404` |
| `POST` | `/api/v1/events` | Registrar nuevo evento con validacion Zod | `201 Created` | `400 Bad Request` |
| `PUT` | `/api/v1/events/:id` | Actualizacion parcial o total validada | `200 OK` | `400 / 404` |
| `DELETE` | `/api/v1/events/:id` | Eliminar evento por ID validado | `204 No Content` | `400 / 404` |

---

## Contratos de Respuesta Estandarizados

### Respuesta de Error de Validacion (`400 Bad Request`)
```json
{
  "error": "Validation Error",
  "message": "Datos de entrada inválidos",
  "issues": [
    {
      "field": "name",
      "message": "name es obligatorio"
    },
    {
      "field": "price",
      "message": "El presupuesto asignado (price) en COP debe ser mayor a 0"
    }
  ]
}
```

### Respuesta de Recurso No Encontrado (`404 Not Found`)
```json
{
  "error": "Not Found",
  "message": "Event 999 not found"
}
```

### Respuesta de Ruta Inexistente (`404 Not Found` via middleware `notFound`)
```json
{
  "error": "Not Found",
  "message": "Ruta GET /ruta-inexistente no encontrada"
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
    ├── config/
    │   └── logger.ts
    ├── controllers/
    │   └── events.controller.ts
    ├── errors/
    │   └── AppError.ts
    ├── middlewares/
    │   ├── errorHandler.ts
    │   └── notFound.ts
    ├── repositories/
    │   └── events.repository.ts
    ├── routes/
    │   └── events.routes.ts
    ├── schemas/
    │   └── event.schema.ts
    └── services/
        └── events.service.ts
```

---

## Instrucciones de Ejecucion

```bash
# 1. Instalar dependencias con pnpm
pnpm install

# 2. Compilar TypeScript en modo estricto
pnpm build

# 3. Arrancar en modo desarrollo con recarga automatica y morgan
pnpm dev

# 4. Arrancar en modo produccion
pnpm start
```

---

## Pruebas de Endpoints con curl

```bash
# 1. Health check
curl http://localhost:3000/health

# 2. Listado paginado con logs http
curl "http://localhost:3000/api/v1/events?page=1&limit=3"

# 3. Validacion Zod fallida en POST (400 Bad Request con array issues)
curl -s -i -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "capacity": -10
  }'

# 4. Validacion fallida en parametro :id (400 Bad Request)
curl -s -i http://localhost:3000/api/v1/events/abc

# 5. Recurso inexistente manejado por AppError (404 Not Found)
curl -s -i http://localhost:3000/api/v1/events/999

# 6. Ruta inexistente capturada por middleware notFound (404 Not Found)
curl -s -i http://localhost:3000/api/v1/rutas-que-no-existen

# 7. Creacion exitosa con validacion Zod (201 Created)
curl -s -i -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Festival Internacional de Cine de Cartagena",
    "category": "festival",
    "price": 140000000,
    "capacity": 8000,
    "active": true,
    "location": "Centro de Convenciones Cartagena de Indias",
    "date": "2026-10-15T18:00:00.000Z"
  }'

# 8. Actualizacion exitosa con updateEventSchema.partial() (200 OK)
curl -s -i -X PUT http://localhost:3000/api/v1/events/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 190000000
  }'

# 9. Eliminacion exitosa (204 No Content)
curl -s -i -X DELETE http://localhost:3000/api/v1/events/1
```
