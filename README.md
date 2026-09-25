# Semana 09 — Testing de API REST

Proyecto: **Productora de Eventos**
Estudiante: Andrés Felipe Fernández Cardoza — Ficha 3228970

## Objetivo de la semana

Cubrir con pruebas automatizadas (Jest + Supertest) la API REST de gestión de
eventos, alcanzando los umbrales mínimos de cobertura definidos en
`jest.config.ts`:

| Métrica     | Umbral | Resultado |
|-------------|--------|-----------|
| Statements  | 80%    | 93%       |
| Branches    | 70%    | 77.27%    |
| Functions   | 80%    | 91.17%    |
| Lines       | 80%    | 94.73%    |

## Estructura de pruebas

- `src/__tests__/events.service.test.ts` — **pruebas unitarias** del servicio
  de eventos. El repositorio (`events.repository.ts`) se mockea con
  `jest.mock()` para aislar la lógica de negocio, incluyendo las reglas de
  autorización "propietario o admin" en actualización y eliminación.
- `src/__tests__/auth.service.test.ts` — **pruebas unitarias** del servicio de
  autenticación (registro, login, perfil). `bcrypt` y el repositorio de
  usuarios se mockean.
- `src/__tests__/events.routes.test.ts` — **pruebas de integración** que
  levantan la `app` de Express real contra una instancia de MongoDB en
  memoria (`mongodb-memory-server`), cubriendo autenticación, validación,
  códigos de estado y permisos de extremo a extremo para `/api/auth/*` y
  `/api/events/*`.

## Dominio

Recurso principal: **Evento** (`concierto`, `boda`, `conferencia`,
`corporativo`, `festival`, `exposicion`), con nombre, código único, precio,
aforo, ubicación y fecha. Cada evento pertenece al usuario que lo creó
(`createdBy`); solo su dueño o un usuario con rol `admin` pueden modificarlo
o eliminarlo.

## Endpoints

| Método | Ruta                | Descripción                          | Acceso            |
|--------|---------------------|---------------------------------------|-------------------|
| POST   | `/api/auth/register`| Registro de usuario                   | Público           |
| POST   | `/api/auth/login`   | Inicio de sesión, emite `accessToken` | Público           |
| GET    | `/api/auth/me`      | Perfil del usuario autenticado        | Autenticado       |
| GET    | `/api/events`       | Listar eventos                        | Público           |
| GET    | `/api/events/:id`   | Detalle de un evento                  | Público           |
| POST   | `/api/events`       | Crear evento                          | Autenticado       |
| PATCH  | `/api/events/:id`   | Actualizar evento (dueño o admin)     | Autenticado       |
| DELETE | `/api/events/:id`   | Eliminar evento (dueño o admin)       | Autenticado       |

## Cómo ejecutar

```bash
pnpm install
pnpm test              # ejecuta la suite completa
pnpm test:coverage     # ejecuta la suite con reporte de cobertura
pnpm test:watch        # modo watch
```

Las pruebas usan `.env.test` y una instancia de MongoDB en memoria, por lo
que no requieren Docker ni una base de datos real. Para desarrollo local,
copiar `.env.example` a `.env` y levantar MongoDB con:

```bash
docker compose up -d
pnpm run dev
```
