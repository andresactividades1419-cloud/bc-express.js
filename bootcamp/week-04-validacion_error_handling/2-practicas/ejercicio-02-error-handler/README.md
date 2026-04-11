# Ejercicio 02: Middleware de Errores Global

## 🎯 Objetivo

Implementar el sistema de manejo de errores completo de una API Express: la clase
`AppError`, el middleware `notFound`, el middleware `errorHandler` (4 parámetros) y
registrarlos en el orden correcto en `app.ts`.

## 📋 Punto de partida

El starter ya incluye la API de productos del ejercicio anterior **funcionando
correctamente** con validación Zod. El servidor maneja los errores lanzando
excepciones, pero Express no sabe qué responder — devuelve un HTML genérico 500.

Tu tarea es implementar el sistema de errores estructurado para que la API responda
siempre JSON con el código HTTP correcto.

---

## Paso 1 — Clase `AppError`

Abre `starter/src/errors/AppError.ts` y descomenta el bloque marcado como **PASO 1**.

La clase `AppError` representa errores operacionales predecibles (404, 409, 403, etc.)
que el servidor produce intencionalmente:

```ts
// Ejemplo de uso — NO modifiques el controller, solo descomenta AppError
throw new AppError(404, 'El producto no existe');
throw new AppError(409, 'Ya existe un producto con ese nombre');
```

Después de descomentar, verifica que TypeScript compile sin errores.

---

## Paso 2 — Middleware `notFound`

Abre `starter/src/middlewares/notFound.ts` y descomenta el bloque marcado como
**PASO 2**.

Este middleware se registra **después de todas las rutas** y se activa cuando ninguna
ruta coincide con la petición. Debe pasar un `AppError` con código 404 al siguiente
manejador de errores:

```ts
// Resultado esperado al llamar GET /api/v1/inexistente
{
  "error": "Not Found",
  "message": "Ruta GET /api/v1/inexistente no encontrada"
}
```

---

## Paso 3 — Middleware `errorHandler`

Abre `starter/src/middlewares/errorHandler.ts` y descomenta el bloque marcado como
**PASO 3**.

El `errorHandler` **debe tener exactamente 4 parámetros** — Express lo identifica
como manejador de errores por la aridad de la función. Distingue tres tipos:

| Tipo de error | Código HTTP | Formato de respuesta |
|---|---|---|
| `ZodError` | 400 | `{ error, message, issues[] }` |
| `AppError` | `err.statusCode` | `{ error, message }` |
| Genérico | 500 | `{ error, message }` (sin stack en prod) |

---

## Paso 4 — Registrar en `app.ts`

Abre `starter/src/app.ts` y descomenta el bloque marcado como **PASO 4**.

El orden es **crítico**. Express ejecuta los middlewares en el orden en que se
registran:

```
1. express.json()        ← parsear body
2. /api/v1/products      ← rutas de la API
3. notFound              ← rutas no encontradas (3 parámetros)
4. errorHandler          ← manejo centralizado de errores (4 parámetros)
```

---

## ✅ Verificación

Con el servidor corriendo (`pnpm dev`), prueba estos escenarios:

### Ruta inexistente → 404 JSON
```bash
curl http://localhost:3000/api/v1/inexistente
# {"error":"Not Found","message":"Ruta GET /api/v1/inexistente no encontrada"}
```

### Body inválido → 400 con issues
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{"name":"","price":-10}'
# {"error":"Validation Error","message":"Datos de entrada inválidos","issues":[...]}
```

### Producto no encontrado → 404 AppError
```bash
curl http://localhost:3000/api/v1/products/9999
# {"error":"Not Found","message":"Product 9999 not found"}
```

### :id no numérico → 400 con issue
```bash
curl http://localhost:3000/api/v1/products/abc
# {"error":"Validation Error","message":"Parámetro inválido","issues":[...]}
```

### HTML de Express **no aparece** — toda respuesta es JSON ✅
