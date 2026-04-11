# Rúbrica de Evaluación — Semana 04

## 📊 Distribución de Evidencias

| Tipo de Evidencia | Peso | Mínimo para aprobar |
|-------------------|:----:|:-------------------:|
| 🧠 Conocimiento (quiz) | 30% | 70% |
| 💪 Desempeño (ejercicios) | 40% | 70% |
| 📦 Producto (proyecto) | 30% | 70% |

---

## 🧠 Evaluación de Conocimiento — Quiz (10 preguntas)

| # | Pregunta | Respuesta esperada |
|---|----------|--------------------|
| 1 | ¿Qué método de Zod lanza una excepción si la validación falla? | `.parse()` — lanza `ZodError` |
| 2 | ¿Qué retorna `.safeParse()` cuando la validación falla? | `{ success: false, error: ZodError }` |
| 3 | ¿Por qué `AppError` extiende `Error`? | Para poder hacer `instanceof AppError` y diferenciar errores del dominio |
| 4 | ¿Cuántos parámetros debe tener el middleware global de errores en Express? | 4: `(err, req, res, next)` |
| 5 | ¿Dónde se registra el error handler global en `app.ts`? | Después de todas las rutas (`app.use(errorHandler)`) |
| 6 | ¿Qué hace el 404 handler? | Captura peticiones que no coincidieron con ninguna ruta y responde 404 |
| 7 | ¿Qué nivel de Winston se usa para errores de producción críticos? | `error` |
| 8 | ¿Qué diferencia hay entre `error.parse()` y un `AppError`? | `ZodError` viene de validación de input; `AppError` es un error HTTP del dominio |
| 9 | ¿Por qué `isOperational: true` en `AppError`? | Para distinguir errores esperados (ej: 404) de bugs del programador (ej: crash) |
| 10 | ¿Qué módulo se usa para registrar logs de peticiones HTTP en Express? | Morgan |

---

## 💪 Evaluación de Desempeño

### Ejercicio 01 — Validación con Zod (20 puntos)

| Criterio | Puntos |
|----------|:------:|
| Define schemas Zod correctos para Create y Update DTOs | 5 |
| Usa `.safeParse()` (no `.parse()` directo) en el controller | 5 |
| Respuesta 400 con errores descriptivos de Zod en formato `ErrorResponse` | 5 |
| El schema de Update usa `.partial()` sin duplicar código | 3 |
| TypeScript infiere el tipo desde el schema (`z.infer<typeof schema>`) | 2 |

### Ejercicio 02 — AppError y Error Handler (20 puntos)

| Criterio | Puntos |
|----------|:------:|
| `AppError` extiende `Error` con `statusCode` e `isOperational` | 4 |
| Error handler tiene firma de 4 parámetros y es el último middleware | 4 |
| Distingue `AppError`, `ZodError` y errores genéricos en el handler | 5 |
| 404 handler responde `{ error, message }` con status 404 | 3 |
| Stack trace solo visible en `NODE_ENV !== 'production'` | 2 |
| Todos los `try/catch` en controllers pasan el error a `next(err)` | 2 |

---

## 📦 Evaluación del Producto — Proyecto Semanal (100 puntos)

### Arquitectura y código (70 puntos)

| Criterio | Puntos | Descripción |
|----------|:------:|-------------|
| `AppError` implementada correctamente | 10 | Extiende Error, statusCode, isOperational |
| Schemas Zod definidos para Create y Update | 15 | En carpeta `schemas/`, con tipos inferidos |
| Validación activa en endpoints POST y PUT | 15 | Usa safeParse, devuelve 400 con issues |
| Error handler global captura todos los errores | 15 | Distingue AppError, ZodError y Error genérico |
| 404 handler antes del error handler | 5 | Responde en formato ErrorResponse |
| Winston logger configurado | 10 | Console en dev, nivel controlado por ENV |

### Dominio y TypeScript (30 puntos)

| Criterio | Puntos | Descripción |
|----------|:------:|-------------|
| Dominio asignado aplicado coherentemente | 10 | Nombres, campos y datos coherentes |
| TypeScript sin `any` (strict mode) | 10 | `pnpm build` sin errores |
| Tipos inferidos desde schemas Zod | 5 | `z.infer<typeof createSchema>` como DTO |
| README actualizado con descripción del dominio | 5 | Campos, endpoints y ejemplos |

### Penalizaciones

| Infracción | Penalización |
|------------|:------------:|
| Uso de `.parse()` en lugar de `.safeParse()` sin try/catch | -10 pts |
| Error handler sin 4 parámetros (no funciona como error handler) | -15 pts |
| `console.log` en lugar de `logger` en código de producción | -5 pts/instancia |
| Lógica de negocio en controller (calcula, decide, transforma) | -10 pts |
| Secrets hardcodeados (JWT_SECRET, DB_URL directos) | -20 pts |
