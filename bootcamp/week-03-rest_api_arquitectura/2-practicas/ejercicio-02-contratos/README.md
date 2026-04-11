# Ejercicio 02 — Contratos de Respuesta REST

## 🎯 Objetivo

Aplicar contratos de respuesta consistentes a una API Express: `data wrapper`, `paginación` y `contrato de error`.

Aprenderás a:
- Envolver todas las respuestas exitosas con `{ data: ... }`
- Agregar paginación con query params `?page=&limit=`
- Unificar los errores con `{ error, message }`
- Usar TypeScript generics para tipar los contratos

---

## 📋 Estructura del ejercicio

```
ejercicio-02-contratos/
└── starter/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── app.ts         # Ya configurado
        ├── server.ts      # Ya configurado
        ├── types.ts       # Paso 1: definir contratos genéricos
        └── routes/
            └── books.routes.ts  # Pasos 2, 3 y 4
```

---

## 📝 Pasos

### Paso 1: Definir los tipos de respuesta

Abre `src/types.ts` y descomenta el bloque del **Paso 1**.

Define los 3 contratos genéricos:
- `SingleResponse<T>` — para GET por ID y POST (201)
- `PaginatedResponse<T>` — para GET colección
- `ErrorResponse` — para errores 400, 404, 500

```ts
// Así deben quedar los tipos después de descomentar:
// interface SingleResponse<T> { data: T }
// interface PaginatedResponse<T> { data: T[]; total: number; page: number; limit: number }
// interface ErrorResponse { error: string; message: string }
```

---

### Paso 2: Envolver respuestas de éxito

Abre `src/routes/books.routes.ts` y descomenta el bloque del **Paso 2**.

Todas las respuestas deben seguir el contrato `SingleResponse<T>`:
- `GET /:id` → `{ data: book }`
- `POST /` → `{ data: newBook }` con status 201
- `PUT /:id` → `{ data: updatedBook }`

---

### Paso 3: Paginación con contratos

Descomenta el bloque del **Paso 3** en el mismo archivo.

El endpoint `GET /` debe:
- Leer `?page=` y `?limit=` de `req.query`
- Aplicar slice al array de datos
- Retornar `PaginatedResponse<Book>` con `total`, `page`, `limit`

```
GET /api/v1/books?page=1&limit=3
→ { data: [...3 libros], total: 8, page: 1, limit: 3 }
```

---

### Paso 4: Contrato de error unificado

Descomenta el bloque del **Paso 4**.

Todos los errores deben seguir `ErrorResponse`:
- `GET /:id` con ID inexistente → `404 { error: 'Not Found', message: '...' }`
- `POST /` sin campos requeridos → `400 { error: 'Bad Request', message: '...' }`
- Error handler global → `500 { error: 'Internal Server Error', message: '...' }`

---

## ✅ Criterios de verificación

- [ ] `GET /api/v1/books` retorna `{ data: [...], total, page, limit }`
- [ ] `GET /api/v1/books?page=2&limit=3` retorna la segunda página correcta
- [ ] `GET /api/v1/books/1` retorna `{ data: { id: 1, ... } }`
- [ ] `GET /api/v1/books/999` retorna `{ error: 'Not Found', message: '...' }` con 404
- [ ] `POST /api/v1/books` sin `title` retorna `{ error: 'Bad Request', message: '...' }` con 400
- [ ] `POST /api/v1/books` con datos válidos retorna `{ data: {...} }` con 201
- [ ] TypeScript compila sin errores (`pnpm build`)
- [ ] Los tipos `SingleResponse<T>` y `PaginatedResponse<T>` tipan explícitamente los handlers
