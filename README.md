# Productora de Eventos - Semana 07: Autenticacion con JWT, Cookies HttpOnly y Hashing bcrypt

Sistema de gestion y produccion de eventos con autenticacion robusta basada en JSON Web Tokens (JWT), proteccion de contrasenas mediante hashing con bcrypt, transporte seguro en cookies HttpOnly y rotacion de Refresh Tokens.

Todos los presupuestos y valores monetarios se gestionan exclusivamente en Pesos Colombianos (COP).

---

## 1. Arquitectura y Diseno del Sistema

El proyecto implementa una arquitectura modular por capas con separacion clara de responsabilidades:

- **Models (`src/models/`):** Esquemas de Mongoose con tipos de TypeScript (`UserModel`, `EventModel`). El modelo de usuario omite por defecto campos sensibles (`password`, `refreshToken`) mediante `select: false`.
- **Repositories (`src/repositories/`):** Capa de acceso a datos directa sobre MongoDB, encapsulando consultas y manejo de errores de bajo nivel.
- **Services (`src/services/`):** Capa de logica de negocio, generacion de tokens, verificacion de hashes y orquestacion.
- **Controllers (`src/controllers/`):** Controladores HTTP encargados de interpretar solicitudes, gestionar cookies HttpOnly y enviar respuestas estructuradas.
- **Middlewares (`src/middlewares/`):** Autenticacion (`authenticate`), autorizacion por roles (`authorize`), validacion de esquemas Zod (`validateBody`, `validateParams`), y manejo centralizado de errores (`errorHandler`).
- **Schemas (`src/schemas/`):** Validacion rigurosa de entradas en tiempo de ejecucion con Zod.
- **Utils (`src/utils/`):** Firmado y verificacion tipada de tokens JWT de acceso y refresco.
- **Config (`src/config/`):** Registro de eventos y peticiones mediante Winston y Morgan.

---

## 2. Estrategia de Seguridad y Autenticacion

### Hashing de Contrasenas
- Se emplea la libreria `bcrypt` con un costo de 10 rondas de sal (salt rounds).
- Las contrasenas nunca se almacenan en texto plano.
- En los endpoints de inicio de sesion se mitiga la enumeracion de usuarios retornando mensajes genericos (`Credenciales invalidas`) tanto para correos no registrados como para contrasenas erroneas.

### Ciclo de Vida de Tokens JWT
1. **Access Token:**
   - Vigencia: 15 minutos.
   - Proposito: Autorizar peticiones a rutas protegidas.
   - Transporte: Cookie HttpOnly con ruta raiz (`/`) o encabezado `Authorization: Bearer <token>`.
2. **Refresh Token:**
   - Vigencia: 7 dias.
   - Proposito: Solicitar un nuevo par de tokens sin requerir que el usuario ingrese nuevamente sus credenciales.
   - Transporte: Cookie HttpOnly restringida exclusivamente a la ruta `/api/v1/auth`.
   - Rotacion y Revocacion: Cada solicitud a `/refresh` genera un nuevo par de tokens e invalida el anterior, almacenando el hash del nuevo refresh token en MongoDB.

### Atributos de las Cookies
- `httpOnly: true`: Inaccesible desde JavaScript en el navegador, mitigando ataques de Cross-Site Scripting (XSS).
- `sameSite: 'strict'`: Previene el envio de cookies en peticiones de origen cruzado, mitigando ataques de Cross-Site Request Forgery (CSRF).
- `secure: true`: Habilitado automaticamente en entornos de produccion (`NODE_ENV=production`) para transmision sobre HTTPS.

---

## 3. Variables de Entorno

Crear un archivo `.env` en la raiz del proyecto tomando como referencia `.env.example`:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/productora_eventos_auth
JWT_ACCESS_SECRET=clave_secreta_para_access_tokens_productora_2026
JWT_REFRESH_SECRET=clave_secreta_para_refresh_tokens_productora_2026
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 4. Endpoints de la API

### Autenticacion (`/api/v1/auth`)

| Metodo | Ruta | Descripcion | Requiere Autenticacion |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Registro de nuevos usuarios y asignacion inicial de tokens | No |
| POST | `/api/v1/auth/login` | Autenticacion de usuario con emision de cookies | No |
| POST | `/api/v1/auth/refresh` | Rotacion y renovacion de tokens de acceso y refresco | No (Requiere cookie de refresco) |
| POST | `/api/v1/auth/logout` | Cierre de sesion, revocacion en BD y limpieza de cookies | Si |
| GET | `/api/v1/auth/me` | Obtencion de los datos del usuario autenticado actual | Si |

### Eventos Protegidos (`/api/v1/events`)

Todas las rutas de eventos requieren autenticacion valida via Access Token (cookie o Bearer header).

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/api/v1/events` | Listar todos los eventos (soporta filtros por query: `?status=...&type=...`) |
| GET | `/api/v1/events/:id` | Obtener detalle de un evento por su ObjectId de MongoDB |
| POST | `/api/v1/events` | Crear un nuevo evento asignando automaticamente `createdBy` al usuario autenticado |
| PATCH | `/api/v1/events/:id` | Actualizar parcialmente los datos de un evento |
| DELETE | `/api/v1/events/:id` | Eliminar un evento existente |

---

## 5. Modelos de Datos

### Usuario (`User`)
- `name`: String (minimo 2 caracteres).
- `email`: String unico, indexado y normalizado a minusculas.
- `password`: String hasheado con bcrypt (oculto en consultas por defecto).
- `role`: `'user' | 'admin' | 'producer'`.
- `refreshToken`: String hasheado con bcrypt (oculto en consultas por defecto).
- `createdAt` / `updatedAt`: Timestamps automaticos.

### Evento (`Event`)
- `title`: String unico y descriptivo del evento.
- `description`: String con el detalle de la actividad.
- `date`: Fecha programada del evento.
- `location`: Ubicacion fisica del evento.
- `budgetCOP`: Presupuesto total asignado estrictamente en Pesos Colombianos (COP).
- `type`: Tipo de evento (`corporate`, `wedding`, `concert`, `conference`, `social`, `festival`).
- `status`: Estado del evento (`planning`, `confirmed`, `in_progress`, `completed`, `cancelled`).
- `attendeesCount`: Cantidad estimada o confirmada de asistentes.
- `createdBy`: Referencia al ObjectId del usuario responsable.
- `createdAt` / `updatedAt`: Timestamps automaticos.

---

## 6. Instrucciones de Ejecucion

### Instalacion de Dependencias
```bash
pnpm install
```

### Ejecucion con Base de Datos en Docker
Para levantar una instancia local de MongoDB:
```bash
docker compose up -d
```

### Inicializacion de Datos de Prueba (Seed)
```bash
pnpm run seed
```
Usuarios creados por defecto:
- Administrador: `admin@productora.com` (Contrasena: `Password123!`)
- Productor: `productor@productora.com` (Contrasena: `Password123!`)

### Modo Desarrollo
```bash
pnpm run dev
```

### Compilacion a Produccion
```bash
pnpm run build
pnpm start
```
