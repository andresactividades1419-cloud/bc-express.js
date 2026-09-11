# Productora de Eventos - Semana 08: RBAC y Capas de Seguridad

API REST con autenticacion JWT, autorizacion basada en roles (RBAC) y las cinco capas de seguridad exigidas: cabeceras HTTP endurecidas (Helmet), CORS con lista blanca, rate limiting diferenciado, sanitizacion de entradas contra NoSQL injection, y manejo de errores sin fuga de informacion interna.

Todos los presupuestos y valores monetarios se gestionan en Pesos Colombianos (COP).

---

## 1. Dominio y Recurso Principal

**Recurso principal: `Event` (evento/produccion).** Cada evento pertenece a la persona que lo creo (`createdBy`), lo cual permite aplicar autorizacion a nivel de dueno ademas de por rol.

- `name`: nombre del evento.
- `code`: codigo alfanumerico unico (ej. `EVT-2026-201`).
- `category`: `concierto`, `boda`, `conferencia`, `corporativo`, `festival`, `exposicion`.
- `price`: presupuesto asignado en COP.
- `capacity`: aforo estimado (por defecto 100).
- `active`: estado activo/inactivo (por defecto `true`).
- `location`: recinto o lugar del evento.
- `date`: fecha programada.
- `createdBy`: ID del usuario (productor) que registro el evento.

---

## 2. Roles y Permisos (RBAC)

| Rol | Puede |
|---|---|
| Publico (sin token) | Ver el catalogo de eventos y el detalle de cada uno |
| `user` | Todo lo anterior, ademas crear eventos y editar **sus propios** eventos |
| `admin` | Todo lo anterior, ademas editar y eliminar **cualquier** evento |

La verificacion de "dueno o admin" ocurre en `event.service.ts::update` (compara `createdBy` contra el usuario autenticado); la restriccion de "solo admin" para eliminar se aplica directamente en la ruta con el middleware `requireRole('admin')`.

---

## 3. Endpoints de la API

### Autenticacion (`/api/v1/auth`)

| Metodo | Ruta | Descripcion | Acceso |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Registro de nuevos usuarios | Publico (rate-limited: 5/15min) |
| POST | `/api/v1/auth/login` | Inicio de sesion, emite `accessToken` (body) + `refreshToken` (cookie httpOnly) | Publico (rate-limited: 5/15min) |
| POST | `/api/v1/auth/refresh` | Renueva el access token usando la cookie de refresco | Requiere cookie de refresco |
| POST | `/api/v1/auth/logout` | Cierra sesion y limpia la cookie de refresco | Autenticado |
| GET | `/api/v1/auth/me` | Datos del usuario autenticado | Autenticado |

### Usuarios (`/api/v1/users`)

| Metodo | Ruta | Descripcion | Acceso |
|---|---|---|---|
| GET | `/api/v1/users/dashboard` | Panel del usuario autenticado | Autenticado |

### Eventos (`/api/v1/events`)

| Metodo | Ruta | Descripcion | Acceso |
|---|---|---|---|
| GET | `/api/v1/events` | Listar eventos (filtros `?category=...&active=...`) | Publico |
| GET | `/api/v1/events/:id` | Detalle de un evento | Publico |
| POST | `/api/v1/events` | Crear evento (asigna `createdBy` al usuario autenticado) | Autenticado |
| PATCH | `/api/v1/events/:id` | Actualizar evento (dueno o admin; 403 si no) | Autenticado |
| DELETE | `/api/v1/events/:id` | Eliminar evento | Solo `admin` |

---

## 4. Capas de Seguridad Aplicadas

- **Helmet:** aplicado globalmente en `app.ts` (primero en la cadena de middlewares) — agrega cabeceras como `X-Content-Type-Options: nosniff`, `X-DNS-Prefetch-Control`, `Strict-Transport-Security`, entre otras.
- **Rate limiting:**
  - Global: 100 peticiones / 15 min en toda la API.
  - Auth: 5 peticiones / 15 min en `/register` y `/login` (proteccion contra fuerza bruta). Ambos exponen las cabeceras `RateLimit-*` (`draft-7`).
- **CORS con lista blanca:** `src/config/security.ts` solo permite los origenes declarados en `ALLOWED_ORIGINS` (no usa `cors()` sin configurar ni `origin: '*'`); un origen no listado recibe un error de CORS.
- **Sanitizacion NoSQL:** `express-mongo-sanitize` se aplica despues de parsear el body y antes de las rutas, eliminando operadores de MongoDB (`$gt`, `$ne`, etc.) inyectados en el JSON de entrada.
- **Validacion con Zod:** los schemas de `event.schema.ts` rechazan HTML en campos de texto libre (`/^[^<>]*$/`), mitigando XSS almacenado.
- **Sin fuga de informacion en errores:** `errorHandler.ts` nunca envia `stack traces` al cliente; los errores no controlados solo se registran en el log del servidor y responden `{ error: 'Internal server error' }`.
- **Sin secretos hardcodeados:** `JWT_ACCESS_SECRET` y `JWT_REFRESH_SECRET` se leen de variables de entorno (`.env`, nunca commiteado); `.env.example` solo trae placeholders descriptivos.
- **Contrasenas:** hasheadas con `bcrypt` (12 salt rounds), nunca se almacenan ni se devuelven en texto plano.

---

## 5. Variables de Entorno

Crear un archivo `.env` en la raiz tomando como referencia `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bc-express-semana-08
JWT_ACCESS_SECRET=cambia_esto_por_un_secreto_largo_y_aleatorio_access
JWT_REFRESH_SECRET=cambia_esto_por_un_secreto_largo_y_aleatorio_refresh
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

---

## 6. Instrucciones de Ejecucion

```bash
# 1. Instalar dependencias
pnpm install

# 2. Levantar MongoDB local
docker compose up -d

# 3. Modo desarrollo (siembra usuarios y eventos de ejemplo al arrancar)
pnpm run dev
```

Usuarios de prueba creados automaticamente al iniciar el servidor por primera vez:
- Productor: `user@productora.com` / `User1234!`
- Coordinador (admin): `admin@productora.com` / `Admin1234!`

Para verificar que el codigo cumple con TypeScript estricto:
```bash
pnpm run build
```
