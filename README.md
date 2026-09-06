# Semana 06 — Base de Datos NoSQL con MongoDB y Mongoose ODM

## 1. Descripcion del Dominio

Este proyecto corresponde a la **Semana 06** del bootcamp **bc-expressjs**, adaptado al dominio **Productora de Eventos** (`events`, `clients`, `vendors`, `staff`).

En esta semana se realiza la transición a una base de datos documental **NoSQL** utilizando **MongoDB 7** y el ODM **Mongoose**. Se definen dos colecciones relacionadas mediante referencias por `ObjectId`:
- **Client (`clients`):** Entidad secundaria que representa clientes corporativos e institucionales que contratan servicios.
- **Event (`events`):** Entidad principal que representa eventos culturales, conciertos, festivales y galas con presupuestos expresados estrictamente en **Pesos Colombianos (COP)** y referencia documental a `Client` resuelta mediante `.populate('client')`.

---

## 2. Modelo de Datos y Esquemas Mongoose

### Diagrama de Documentos y Referencia

```text
+------------------------------------+          +------------------------------------+
|         Coleccion: clients         |          |         Coleccion: events          |
+------------------------------------+          +------------------------------------+
| _id: ObjectId                      | 1      N | _id: ObjectId                      |
| name: String (Max 120)             |<---------| name: String (Max 150)             |
| email: String (UNIQUE)             |          | code: String (UNIQUE)              |
| phone: String (Max 25)             |          | category: String (Enum)            |
| company: String (Optional)         |          | price: Number (COP > 0)            |
| createdAt: Date                    |          | capacity: Number (Default: 100)    |
| updatedAt: Date                    |          | active: Boolean (Default: true)    |
+------------------------------------+          | location: String                   |
                                                | date: Date                         |
                                                | client: ObjectId (ref: 'Client')   |
                                                | createdAt: Date                    |
                                                | updatedAt: Date                    |
                                                +------------------------------------+
```

### Caracteristicas Tecnicas del Esquema
- **Restricciones Unicas (`unique: true`):**
  - `Client.email`: Correo corporativo unico. Falla con error de clave duplicada `11000`.
  - `Event.code`: Codigo alfanumerico de identificacion unica (ej. `EVT-2026-001`). Falla con error `11000`.
- **Relaciones Documentales por Referencia (`ref`):**
  - `Event.client`: Almacena el `ObjectId` del cliente correspondiente y se resuelve mediante `.populate('client')` en las consultas de listado y detalle.
- **Validacion Zod:**
  - Validador estricto de identificadores hexadecimales de 24 caracteres (`/^[0-9a-fA-F]{24}$/`).

---

## 3. Instrucciones de Instalacion y Puesta en Marcha

### Prerrequisitos
- Node.js >= 22.0.0
- pnpm >= 10.34.5
- Docker Desktop o una instancia activa de MongoDB 7

### Pasos de Ejecucion

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Levantar MongoDB con Docker Compose:**
   ```bash
   docker compose up -d
   ```

3. **Configurar variables de entorno (`.env`):**
   ```env
   MONGODB_URI=mongodb://bootcamp:bootcamp123@localhost:27017/bootcamp_dev?authSource=admin
   PORT=3000
   NODE_ENV=development
   ```

4. **Ejecutar seed de datos iniciales:**
   ```bash
   pnpm seed
   ```

5. **Compilar el proyecto con TypeScript:**
   ```bash
   pnpm build
   ```

6. **Iniciar servidor en modo desarrollo:**
   ```bash
   pnpm dev
   ```

7. **Iniciar servidor en modo produccion:**
   ```bash
   pnpm start
   ```

---

## 4. Catalogo de Endpoints de la API

### Entidad Secundaria: Clientes (`/api/v1/clients`)

| Metodo | Ruta | Descripcion | Codigo HTTP |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/clients` | Listar todos los clientes ordenados alfabeticamente | `200 OK` |
| `GET` | `/api/v1/clients/:id` | Obtener cliente por su ObjectId | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `POST` | `/api/v1/clients` | Crear un cliente corporativo | `201 Created` / `400 Bad Request` / `409 Conflict` |
| `PUT` | `/api/v1/clients/:id` | Actualizar datos de un cliente | `200 OK` / `400 Bad Request` / `404 Not Found` / `409 Conflict` |
| `DELETE` | `/api/v1/clients/:id` | Eliminar un cliente | `204 No Content` / `400 Bad Request` / `404 Not Found` |

### Entidad Principal: Eventos (`/api/v1/events`)

| Metodo | Ruta | Descripcion | Codigo HTTP |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Chequeo de salud del servidor | `200 OK` |
| `GET` | `/api/v1/events` | Listado paginado con `.populate('client')` | `200 OK` |
| `GET` | `/api/v1/events/:id` | Detalle del evento con cliente populado | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `POST` | `/api/v1/events` | Crear evento (valida que client sea ObjectId valido) | `201 Created` / `400 Bad Request` / `409 Conflict` |
| `PUT` | `/api/v1/events/:id` | Actualizar evento parcialmente | `200 OK` / `400 Bad Request` / `404 Not Found` / `409 Conflict` |
| `DELETE` | `/api/v1/events/:id` | Eliminar evento por su ObjectId | `204 No Content` / `400 Bad Request` / `404 Not Found` |

---

## 5. Ejemplos de Solicitudes y Respuestas

### A. Listado Paginado con Populate (`GET /api/v1/events?page=1&limit=2`)

**Respuesta HTTP 200 OK:**
```json
{
  "data": [
    {
      "_id": "66da00000000000000000001",
      "name": "Festival Estéreo Picnic 2026",
      "code": "EVT-2026-001",
      "category": "festival",
      "price": 185000000,
      "capacity": 45000,
      "active": true,
      "location": "Parque Simón Bolívar, Bogotá",
      "date": "2026-03-27T14:00:00.000Z",
      "client": {
        "_id": "66da00000000000000000010",
        "name": "Páramo Presenta SAS",
        "email": "contacto@paramopresenta.com.co",
        "phone": "+57 310 456 7890",
        "company": "Páramo Producciones"
      },
      "createdAt": "2026-01-10T10:00:00.000Z",
      "updatedAt": "2026-01-10T10:00:00.000Z"
    }
  ],
  "total": 6,
  "page": 1,
  "totalPages": 3
}
```

### B. Creacion Exitosa de Evento (`POST /api/v1/events`)

**Cuerpo de la Peticion:**
```json
{
  "name": "Concierto Filarmonica de Medellin",
  "code": "EVT-2026-007",
  "category": "concierto",
  "price": 85000000,
  "capacity": 1800,
  "active": true,
  "location": "Teatro Metropolitano, Medellin",
  "date": "2026-09-25T19:30:00.000Z",
  "client": "66da00000000000000000010"
}
```

**Respuesta HTTP 201 Created:**
```json
{
  "data": {
    "_id": "66da00000000000000000007",
    "name": "Concierto Filarmonica de Medellin",
    "code": "EVT-2026-007",
    "category": "concierto",
    "price": 85000000,
    "capacity": 1800,
    "active": true,
    "location": "Teatro Metropolitano, Medellin",
    "date": "2026-09-25T19:30:00.000Z",
    "client": {
      "_id": "66da00000000000000000010",
      "name": "Páramo Presenta SAS",
      "email": "contacto@paramopresenta.com.co"
    }
  }
}
```

### C. Conflicto por Clave Duplicada (Codigo 11000 -> HTTP 409)

Si se intenta crear un evento con un codigo `code` ya existente (`EVT-2026-001`):

**Respuesta HTTP 409 Conflict:**
```json
{
  "error": "Conflict",
  "message": "Ya existe un registro con ese valor único en la base de datos"
}
```

### D. Error de Casteo de ObjectId (`CastError` -> HTTP 400)

Si se realiza una peticion como `GET /api/v1/events/id-invalido`:

**Respuesta HTTP 400 Bad Request:**
```json
{
  "error": "Validation Error",
  "message": "Datos de entrada inválidos",
  "issues": [
    {
      "field": "",
      "message": "El ID proporcionado no es un ObjectId de MongoDB válido"
    }
  ]
}
```

---

## 6. Manejo de Errores Especificos de MongoDB

1. **`MongoServerError` 11000 (Duplicate Key):** Traducido a HTTP `409 Conflict`.
2. **`CastError` (Mongoose):** Traducido a HTTP `400 Bad Request`.
3. **`ValidationError` (Mongoose):** Traducido a HTTP `400 Bad Request`.
4. **Recurso `null`:** Traducido a HTTP `404 Not Found` mediante la clase `AppError`.
