# Rúbrica de Evaluación — Semana 13: OpenAPI / Swagger

## 🧠 Conocimiento (30%)

### Preguntas de evaluación

1. ¿Qué es OpenAPI 3.x y cuál es la diferencia con Swagger 2.0?
2. ¿Cuál es la diferencia entre `swagger-jsdoc` y `swagger-ui-express`? ¿Qué hace cada uno?
3. ¿Cómo se define un schema reutilizable en `components/schemas`? ¿Cómo se referencia con `$ref`?
4. ¿Qué tipos de parámetros existen en OpenAPI? (`in: path`, `in: query`, `in: header`, `in: cookie`)
5. ¿Cómo se documenta un `requestBody` con `application/json`?
6. ¿Qué es un `securityScheme` de tipo `http` con esquema `bearer`?
7. ¿Para qué sirven los `tags` en una especificación OpenAPI?
8. ¿Qué ocurre si defines `security: [{BearerAuth: []}]` a nivel de operación vs a nivel de spec?
9. ¿Qué formato tiene la respuesta `204 No Content` y por qué no tiene `content`?
10. ¿Cómo puedes generar el JSON de la especificación (no la UI) desde tu API?

---

## 💪 Desempeño (40%)

### Ejercicio 01 — swagger-basico

| Criterio | Excelente (4) | Bien (3) | Regular (2) | Insuficiente (1) |
|----------|---------------|----------|-------------|------------------|
| **PASO 1: Config swagger-jsdoc** | `swaggerDefinition` completo con `openapi`, `info`, `servers` y `apis` apuntando a rutas | Config funcional con algún campo incompleto | Config parcial con errores menores | No funciona o no está implementado |
| **PASO 2: Montar Swagger UI** | `/api-docs` accesible, UI carga correctamente, spec JSON en `/api-docs.json` | UI accesible con pequeño problema de configuración | UI accesible pero spec vacía o incorrecta | No accesible |
| **PASO 3: Documentar GET** | `GET /products` y `GET /products/:id` con summary, parámetros tipados y responses 200/404 | Documentación funcional con algún response faltante | Solo uno de los dos endpoints documentado | No documentado |
| **PASO 4: Documentar mutaciones** | `POST` y `DELETE` con requestBody, responses 201/204/400 correctamente tipados | Funcional con alguna response faltante | Solo `POST` o solo `DELETE` documentado | No documentado |

### Ejercicio 02 — openapi-seguridad

| Criterio | Excelente (4) | Bien (3) | Regular (2) | Insuficiente (1) |
|----------|---------------|----------|-------------|------------------|
| **PASO 1: Schemas en components** | `Item` y `Error` definidos en `components/schemas`, referenciados con `$ref` en todos los endpoints | Schemas definidos pero `$ref` usado en 50%+ de endpoints | Schemas definidos pero sin usar `$ref` | No definidos |
| **PASO 2: SecurityScheme** | `BearerAuth` definido como `http`/`bearer` en `components/securitySchemes` | Definido pero con tipo incorrecto | Presente pero no funciona en Swagger UI | No definido |
| **PASO 3: Seguridad en rutas** | Rutas protegidas tienen `security: [{BearerAuth: []}]`; rutas públicas sin security | Security aplicada en todas las rutas (incluyendo las públicas) | Security aplicada en algunas rutas protegidas | No aplicada |
| **Tags y organización** | Todos los endpoints tienen `tags`, agrupados lógicamente (ej. `[Items]`, `[Auth]`) | Tags presentes en la mayoría de endpoints | Tags en menos del 50% de endpoints | Sin tags |

---

## 📦 Producto (30%)

### Proyecto semanal

| Criterio | Pts |
|----------|-----|
| `GET /api-docs` accesible y sirve Swagger UI | 10 |
| Spec OpenAPI válida (sin errores en Swagger UI) | 10 |
| Todos los endpoints de la API están documentados | 10 |
| Schemas reutilizables en `components/schemas` con `$ref` | 15 |
| `BearerAuth` security scheme definido y aplicado en rutas protegidas | 15 |
| Endpoints organizados con `tags` coherentes al dominio | 10 |
| `requestBody` documentado con schema correcto en rutas POST/PUT | 10 |
| Respuestas de error (400, 401, 404) documentadas | 10 |
| API adaptada coherentemente al dominio asignado | 10 |
| **Total** | **100** |

---

## 📊 Tabla de aprobación

| Evidencia | Peso | Mínimo para aprobar |
|-----------|------|---------------------|
| Conocimiento 🧠 | 30% | 70% (7/10 preguntas) |
| Desempeño 💪 | 40% | 70% (≥ 2.8 promedio) |
| Producto 📦 | 30% | 70 pts |
