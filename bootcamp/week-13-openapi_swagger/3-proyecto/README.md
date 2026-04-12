# 🚀 Proyecto Semanal — OpenAPI: Documenta tu API

## 🎯 Objetivo

Agregar documentación **OpenAPI 3** completa a la API REST que has construido
en tu dominio asignado. Usarás `swagger-jsdoc` y `swagger-ui-express` para
generar una UI interactiva desde los comentarios `@openapi` en el código.

---

## 📋 Tu Dominio Asignado

**Dominio**: [El instructor te asignará tu dominio]

El starter incluye una API funcional con autenticación JWT, un recurso
principal y endpoints CRUD. **Tu tarea es completar la documentación**, no
reimplementar la lógica.

---

## 🛠️ Setup

```bash
cd starter
pnpm install
cp .env.example .env
# Edita .env con tu DATABASE_URL de PostgreSQL
pnpm prisma migrate dev --name init
pnpm dev
```

Verifica que `GET /health` responde `{ status: 'ok' }` antes de continuar.

---

## ✅ Requisitos Funcionales

### 1. Configurar swagger-jsdoc + swagger-ui-express

**Archivo**: `src/config/swagger.ts`

```typescript
// TODO: Configurar swaggerDefinition con:
//   - openapi: '3.1.0'
//   - info con título descriptivo de tu dominio
//   - servers: localhost + URL de producción (si aplica)
//   - components.schemas: todos los modelos de tu dominio
//   - components.securitySchemes: BearerAuth
//   - tags: Auth + [tu recurso principal]
```

### 2. Montar Swagger UI en app.ts

**Archivo**: `src/app.ts`

```typescript
// TODO: Descomentar el bloque de Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { ... }))
// app.get('/api-docs.json', ...)
```

### 3. Documentar controladores de autenticación

**Archivo**: `src/controllers/auth.controller.ts`

Agrega bloques `@openapi` en cada función de ruta:
- `POST /api/v1/auth/register` → 201 con usuario creado, 409 email duplicado
- `POST /api/v1/auth/login` → 200 con access token, 401 credenciales inválidas

### 4. Documentar controladores del recurso principal

**Archivo**: `src/controllers/items.controller.ts`

_(Adapta "items" al nombre de tu recurso de dominio)_

Documenta los 5 endpoints CRUD con sus respuestas y seguridad correctas:
- `GET /api/v1/items` → público, retorna array (`$ref: Item`)
- `GET /api/v1/items/:id` → público, 200 o 404
- `POST /api/v1/items` → protegido, 201 o 400
- `PUT /api/v1/items/:id` → protegido, 200 o 404
- `DELETE /api/v1/items/:id` → protegido, 204 sin body

### 5. Usar `$ref` para todos los schemas

Evita schemas inline. Toda respuesta con body debe referenciar:
```yaml
$ref: '#/components/schemas/NombreSchema'
```

---

## 💡 Ejemplos de Adaptación por Dominio

| Dominio | Resource | Schemas requeridos |
|---------|----------|--------------------|
| Biblioteca | `Book` | `Book`, `CreateBookDto`, `UpdateBookDto`, `Error` |
| Farmacia | `Medicine` | `Medicine`, `CreateMedicineDto`, `Error` |
| Gimnasio | `Member` | `Member`, `CreateMemberDto`, `Error` |
| Restaurante | `Dish` | `Dish`, `CreateDishDto`, `Error` |
| Hotel | `Room` | `Room`, `CreateRoomDto`, `Error` |

---

## 🛠️ Entregables

1. **Capturas de Swagger UI** con todos los endpoints visibles y organizados en tags
2. **Flujo completo probado desde Swagger UI**:
   - `POST /auth/register` → crear cuenta
   - `POST /auth/login` → obtener token → clic en "Authorize"
   - `POST /items` → crear recurso (con token)
   - `GET /items` → listar (público)
   - `DELETE /items/:id` → eliminar (con token)
3. **README.md** en tu entrega explicando las decisiones de documentación:
   - ¿Qué tags usaste?
   - ¿Qué schemas definiste?
   - ¿Cuáles endpoints son públicos y cuáles protegidos?

---

## 📊 Criterios de Evaluación (ver rubrica-evaluacion.md)

| Criterio | Puntos |
|----------|--------|
| Swagger UI accesible y funcional | 15 |
| `components.schemas` completos con `$ref` | 20 |
| `BearerAuth` funcional en Swagger UI | 15 |
| Endpoints públicos vs protegidos correctos | 15 |
| Tags organizados (Auth + Recurso) | 10 |
| requestBody documentado con schema | 10 |
| Respuestas 4xx documentadas | 10 |
| README de entrega | 5 |
| **Total** | **100** |
