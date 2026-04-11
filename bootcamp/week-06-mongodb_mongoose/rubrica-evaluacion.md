# Rúbrica de Evaluación — Semana 06: MongoDB y Mongoose

## 🧠 Conocimiento (30%) — Cuestionario

Responde cada pregunta con tus propias palabras o señalando la respuesta correcta.

1. ¿Qué es un documento en MongoDB y en qué se diferencia de una fila en SQL?
2. ¿Para qué sirve `{ timestamps: true }` en un Schema de Mongoose?
3. ¿Cuál es la diferencia entre `find()` y `findOne()` en Mongoose?
4. ¿Qué es un `ObjectId` y cómo se diferencia del `id` entero de Prisma?
5. Un usuario ejecuta `Product.findById('abc123')` con un ID inválido. ¿Qué tipo de error lanza Mongoose y cómo lo capturas?
6. ¿Cuándo conviene **embeber** un documento dentro de otro y cuándo conviene usar una **referencia**?
7. ¿Qué hace `.lean()` en una query de Mongoose y por qué mejora el rendimiento?
8. ¿Qué código de error indica una violación de índice `unique` en MongoDB?
9. ¿Qué diferencia hay entre `findByIdAndUpdate(id, data)` y `findByIdAndUpdate(id, data, { new: true })`?
10. ¿Por qué MongoDB no requiere migraciones cuando cambias un Schema de Mongoose?

---

## 💪 Desempeño (40%) — Ejercicios

### Ejercicio 01 — Mongoose Setup (20 puntos)

| Criterio | Puntos |
|----------|--------|
| Schema válido con mínimo 5 campos tipados correctamente | 3 |
| Validadores aplicados (required, min/max, trim, enum, etc.) | 3 |
| `{ timestamps: true }` presente en el Schema | 2 |
| Índice `unique` aplicado al campo correcto | 2 |
| `connectDB()` invocado en `server.ts` antes de `listen()` | 2 |
| `findAll` usa `.lean()` y paginación con `countDocuments()` | 3 |
| `findById` maneja ID inválido (CastError → 400) | 2 |
| `create` captura error 11000 → AppError(409) | 3 |
| **Total** | **20** |

### Ejercicio 02 — Populate (20 puntos)

| Criterio | Puntos |
|----------|--------|
| Schema de entidad secundaria creado y exportado | 3 |
| Campo de referencia `ObjectId` con `ref` correcto en el Schema principal | 4 |
| `findAll` y `findById` usan `.populate()` sobre la referencia | 4 |
| Seed crea documentos de la entidad secundaria antes del principal | 3 |
| Endpoint `GET /items/:id` incluye objeto `category` (o equivalente) en la respuesta | 3 |
| README del ejercicio incluye descripción de la relación | 3 |
| **Total** | **20** |

---

## 📦 Producto (30%) — Proyecto Semanal (100 puntos)

| Criterio | Puntos |
|----------|--------|
| Schema Mongoose coherente con el dominio asignado (≥6 campos, tipado correcto) | 12 |
| Validadores presentes en el Schema (required, trim, min/max o enum) | 8 |
| `connectDB()` invocado correctamente antes de `app.listen()` | 5 |
| Repositorio usa `Model` de Mongoose (no arrays) | 15 |
| `GET /items` con paginación (`countDocuments + skip/take`) | 8 |
| Error 11000 → `AppError(409)` | 8 |
| `CastError` → `AppError(400, 'ID inválido')` | 8 |
| `findById` retorna `null` → `AppError(404)` en el servicio | 8 |
| Sin re-instanciación de conexión (`mongoose.connect` solo una vez) | 5 |
| Seed con mínimo 5 documentos coherentes con el dominio | 5 |
| Dominio propio y no copiado de otro aprendiz | 10 |
| README con descripción del dominio y endpoints | 8 |
| **Total** | **100** |

---

## ⚠️ Penalizaciones

| Infracción | Penalización |
|------------|-------------|
| `MONGODB_URI` hardcodeada en el código (no en `.env`) | -25 pts |
| Uso de arrays en memoria en lugar de MongoDB | -20 pts |
| `mongoose.connect()` llamado dentro del handler de una ruta o repositorio | -15 pts |
| Código sin validadores en el Schema (solo tipos `String`, `Number` sin nada más) | -10 pts |
| No manejar `CastError` con ID inválido (deja el servidor crashear) | -10 pts |
| No usar `.lean()` en ninguna query (pérdida de rendimiento) | -5 pts |
