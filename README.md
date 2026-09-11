# Semana 05 — Persistencia con PostgreSQL y Prisma ORM

## 1. Descripcion del Dominio

Este proyecto corresponde a la **Semana 05** del bootcamp **bc-expressjs**, adaptado al dominio **Productora de Eventos** (`events`, `clients`, `vendors`, `staff`).

En esta etapa se migra la capa de persistencia desde memoria hacia una base de datos relacional **PostgreSQL** mediante el ORM **Prisma**. Se definen dos entidades principales vinculadas por una relacion 1:N:
- **Client (`clients`):** Clientes corporativos e institucionales que contratan servicios para eventos.
- **Event (`events`):** Eventos gestionados por la productora (festivales, conciertos, conferencias, eventos corporativos) con presupuestos expresados estrictamente en **Pesos Colombianos (COP)** y clave foranea hacia `Client`.

---

## 2. Modelo de Datos y Relaciones

### Diagrama Entidad-Relacion

```text
+-----------------------------------+          +-----------------------------------+
|              clients              |          |              events               |
+-----------------------------------+          +-----------------------------------+
| id: String (PK, UUID)             | 1      N | id: String (PK, UUID)             |
| name: String                      |<---------| name: String                      |
| email: String (UNIQUE)            |          | code: String (UNIQUE)             |
| phone: String                     |          | category: String                  |
| company: String (Nullable)        |          | price: Float (COP)                |
| createdAt: DateTime               |          | capacity: Int                     |
| updatedAt: DateTime               |          | active: Boolean                   |
+-----------------------------------+          | location: String                  |
                                               | date: DateTime                    |
                                               | clientId: String (FK -> clients.id, UUID) |
                                               | createdAt: DateTime               |
                                               | updatedAt: DateTime               |
                                               +-----------------------------------+
```

### Caracteristicas del Modelo en `prisma/schema.prisma`
- **Claves primarias y foraneas UUID:** `id String @id @default(uuid()) @db.Uuid` en ambas entidades, y `Event.clientId String @db.Uuid` — siguiendo la regla del bootcamp de no usar `Int @default(autoincrement())`.
- **Restricciones Unicas (`@unique`):**
  - `Client.email`: Evita registrar clientes duplicados. Demuestra el manejo del codigo de error `P2002`.
  - `Event.code`: Codigo alfanumerico de identificacion unico del evento (ej. `EVT-2026-001`). Demuestra el manejo del codigo de error `P2002`.
- **Integridad Referencial:**
  - Relacion `Client` 1:N `Event` mediante `clientId` con eliminacion en cascada (`onDelete: Cascade`).
- **Valores por Defecto y Auditoria:**
  - `capacity` con valor por defecto de 100 asistentes.
  - `active` con valor por defecto `true`.
  - `createdAt` con marca temporal automatica y `updatedAt` autogestionado por Prisma.

---

## 3. Instrucciones de Ejecucion

### Prerrequisitos
- Node.js >= 22.0.0
- pnpm >= 10.34.5
- Docker Desktop o una instancia activa de PostgreSQL 16

### Pasos de Instalacion y Puesta en Marcha

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Levantar PostgreSQL con Docker Compose:**
   ```bash
   docker compose up -d
   ```

3. **Configurar variables de entorno:**
   Asegurar que el archivo `.env` contenga la cadena de conexion:
   ```env
   DATABASE_URL="postgresql://bootcamp:bootcamp123@localhost:5432/bootcamp_dev"
   PORT=3000
   NODE_ENV=development
   ```

4. **Ejecutar migraciones de base de datos:**
   ```bash
   pnpm dlx prisma migrate dev --name init
   ```

5. **Ejecutar seed de datos iniciales:**
   ```bash
   pnpm dlx prisma db seed
   ```

6. **Compilar el proyecto con TypeScript:**
   ```bash
   pnpm build
   ```

7. **Iniciar en modo desarrollo:**
   ```bash
   pnpm dev
   ```

8. **Iniciar en modo produccion:**
   ```bash
   pnpm start
   ```

---

## 4. Catalogo de Endpoints de la API

Base URL: `http://localhost:3000/api/v1/events`

| Metodo | Ruta | Descripcion | Codigo HTTP |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Chequeo de estado del servidor | `200 OK` |
| `GET` | `/api/v1/events` | Listado paginado de eventos (incluye cliente) | `200 OK` |
| `GET` | `/api/v1/events/:id` | Detalle de un evento con relacion al cliente | `200 OK` / `404 Not Found` |
| `POST` | `/api/v1/events` | Creacion de evento validado con Zod | `201 Created` / `400 Bad Request` / `409 Conflict` |
| `PUT` | `/api/v1/events/:id` | Actualizacion parcial de evento | `200 OK` / `404 Not Found` / `409 Conflict` |
| `DELETE` | `/api/v1/events/:id` | Eliminacion de un evento | `204 No Content` / `404 Not Found` |

---

## 5. Ejemplos de Peticiones y Respuestas

### A. Listado Paginado (`GET /api/v1/events?page=1&limit=2`)

**Respuesta HTTP 200 OK:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Festival Estéreo Picnic 2026",
      "code": "EVT-2026-001",
      "category": "festival",
      "price": 185000000,
      "capacity": 45000,
      "active": true,
      "location": "Parque Simón Bolívar, Bogotá",
      "date": "2026-03-27T14:00:00.000Z",
      "clientId": 1,
      "client": {
        "id": 1,
        "name": "Páramo Presenta SAS",
        "email": "contacto@paramopresenta.com.co",
        "phone": "+57 310 456 7890",
        "company": "Páramo Producciones"
      }
    }
  ],
  "total": 6,
  "page": 1,
  "limit": 2
}
```

### B. Creacion de Evento (`POST /api/v1/events`)

**Cuerpo de la Peticion:**
```json
{
  "name": "Festival Internacional de Salsa Cali 2026",
  "code": "EVT-2026-007",
  "category": "festival",
  "price": 140000000,
  "capacity": 20000,
  "active": true,
  "location": "Estadio Pascual Guerrero, Cali",
  "date": "2026-09-18T18:00:00.000Z",
  "clientId": 1
}
```

**Respuesta HTTP 201 Created:**
```json
{
  "data": {
    "id": 7,
    "name": "Festival Internacional de Salsa Cali 2026",
    "code": "EVT-2026-007",
    "category": "festival",
    "price": 140000000,
    "capacity": 20000,
    "active": true,
    "location": "Estadio Pascual Guerrero, Cali",
    "date": "2026-09-18T18:00:00.000Z",
    "clientId": 1,
    "client": {
      "id": 1,
      "name": "Páramo Presenta SAS",
      "email": "contacto@paramopresenta.com.co"
    }
  }
}
```

### C. Conflicto por Registro Unico Duplicado (`P2002` -> `409 Conflict`)

Si se intenta crear un evento con un codigo ya existente (`EVT-2026-001`):

**Respuesta HTTP 409 Conflict:**
```json
{
  "error": "Conflict",
  "message": "Ya existe un evento con ese código único o registro duplicado"
}
```

### D. Recurso No Encontrado (`P2025` -> `404 Not Found`)

Si se intenta consultar, actualizar o eliminar un evento con ID inexistente:

**Respuesta HTTP 404 Not Found:**
```json
{
  "error": "Not Found",
  "message": "Evento con ID 999 no encontrado"
}
```

---

## 6. Manejo de Errores de Base de Datos con Prisma

La capa de repositorio (`events.repository.ts`) captura las instancias de `Prisma.PrismaClientKnownRequestError` y las traduce a excepciones operacionales tipadas de la clase `AppError`:

1. **Codigo `P2002`:** Violacion de restriccion unica. Se traduce a HTTP `409 Conflict`.
2. **Codigo `P2025`:** Registro objetivo no encontrado durante operaciones de actualizacion o eliminacion. Se traduce a HTTP `404 Not Found`.
3. **Codigo `P2003`:** Violacion de clave foranea (ej. asociar un evento a un `clientId` inexistente). Se traduce a HTTP `400 Bad Request`.
