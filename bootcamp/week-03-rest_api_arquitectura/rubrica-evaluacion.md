# Rúbrica de Evaluación — Semana 03: REST API Arquitectura en Capas

## 📊 Distribución de Evidencias

| Tipo | Peso | Instrumento |
|------|-----:|-------------|
| **Conocimiento** 🧠 | 30% | Cuestionario teórico (10 preguntas) |
| **Desempeño** 💪 | 40% | Ejercicios guiados (ejercicio-01 + ejercicio-02) |
| **Producto** 📦 | 30% | Proyecto semanal integrador |

---

## 🧠 Cuestionario Teórico (30%)

### 10 preguntas sobre arquitectura y REST

1. **¿Cuál es la responsabilidad de la capa `controllers` en la arquitectura en capas?**
   - a) Acceder a la base de datos directamente
   - b) Recibir la petición HTTP, llamar al servicio y retornar la respuesta ✅
   - c) Contener toda la lógica de negocio
   - d) Validar los datos de entrada

2. **¿En qué capa debe vivir la lógica de negocio (cálculos, reglas, transformaciones)?**
   - a) Routes
   - b) Controllers
   - c) Services ✅
   - d) Repositories

3. **¿Qué es un DTO (Data Transfer Object)?**
   - a) Un tipo de base de datos
   - b) Una interfaz que define la forma de los datos que entran o salen de la API ✅
   - c) Un middleware de validación
   - d) Una utilidad de TypeScript

4. **¿Por qué se prefiere `/api/v1/products` en lugar de `/products`?**
   - a) Es más fácil de escribir
   - b) Permite versionar la API sin romper clientes existentes ✅
   - c) Es requerido por el estándar HTTP
   - d) Mejora el rendimiento

5. **En un contrato REST, ¿qué código HTTP se usa al crear exitosamente un recurso?**
   - a) 200 OK
   - b) 201 Created ✅
   - c) 204 No Content
   - d) 202 Accepted

6. **¿Cuál es el patrón correcto para una respuesta de listado paginado?**
   - a) `[{...}, {...}]` — array directo
   - b) `{ data: [...], total: 100, page: 1, limit: 10 }` ✅
   - c) `{ items: [...] }`
   - d) `{ results: [...], count: 100 }`

7. **¿Qué debe retornar el repository cuando un recurso no se encuentra?**
   - a) Lanzar directamente un error HTTP 404
   - b) Retornar `null` o `undefined` y dejar que el service decida ✅
   - c) Retornar un objeto vacío `{}`
   - d) Retornar el array completo

8. **¿Por qué se separan `app.ts` (configuración) y `server.ts` (arranque)?**
   - a) Por convención estética
   - b) Para poder importar `app` en tests sin iniciar el servidor ✅
   - c) Express lo requiere así
   - d) Para mejorar el rendimiento

9. **¿Cuál de las siguientes rutas sigue las convenciones REST correctas?**
   - a) `GET /getUser/:id`
   - b) `GET /api/v1/users/:id` ✅
   - c) `POST /api/v1/createUser`
   - d) `GET /api/v1/user/:id` (singular)

10. **En un thin controller, ¿cuánta lógica de negocio debe haber?**
    - a) Toda la lógica de la operación
    - b) Solo la validación de entrada
    - c) Ninguna — el controller solo orquesta y delega al service ✅
    - d) Solo el acceso a base de datos

---

## 💪 Ejercicio 01 — Refactor en Capas (20pts)

### Criterios de evaluación

| Criterio | Puntos |
|----------|-------:|
| La app arranca sin errores con `pnpm dev` | 3 pts |
| Existe separación física en `routes/`, `controllers/`, `services/`, `repositories/` | 4 pts |
| El controller solo lee `req`, llama al service y llama `res.json()` | 4 pts |
| El service contiene la lógica (búsqueda, creación, actualización) | 4 pts |
| El repository es la única capa que accede al store de datos | 3 pts |
| TypeScript compila sin errores (`pnpm build`) | 2 pts |
| **Total** | **20 pts** |

---

## 💪 Ejercicio 02 — Contratos REST (20pts)

### Criterios de evaluación

| Criterio | Puntos |
|----------|-------:|
| Respuesta de listado usa `{ data: [...], total, page, limit }` | 4 pts |
| Respuesta de recurso individual usa `{ data: {...} }` | 3 pts |
| Respuesta de error usa `{ error: string, message: string }` | 4 pts |
| Status codes son correctos en todos los endpoints | 4 pts |
| El endpoint 404 retorna contrato de error correctamente | 3 pts |
| Header `Content-Type: application/json` en todas las respuestas | 2 pts |
| **Total** | **20 pts** |

---

## 📦 Proyecto Semanal (100pts)

### Criterios de evaluación

| Criterio | Puntos |
|----------|-------:|
| **Arquitectura** — Estructura de 4 capas correctamente separada | 20 pts |
| **Controllers** — Thin controllers sin lógica de negocio | 15 pts |
| **Services** — Lógica encapsulada, retorna datos (no res) | 15 pts |
| **Repositories** — Único punto de acceso a datos | 10 pts |
| **Contratos REST** — Responses consistentes con data wrapper | 15 pts |
| **DTOs tipados** — `CreateDto` y `UpdateDto` con TypeScript | 10 pts |
| **Dominio aplicado** — Coherencia con el dominio asignado | 10 pts |
| **TypeScript** — Sin errores de compilación, tipos explícitos | 5 pts |
| **Total** | **100 pts** |

### Penalizaciones

| Infracción | Descuento |
|------------|----------:|
| Lógica de negocio en el controller | -10 pts |
| Acceso a datos fuera del repository | -10 pts |
| Uso de `any` en TypeScript | -5 pts por ocurrencia |
| Status codes incorrectos (ej. 200 en creación) | -5 pts |
| Respuestas sin data wrapper | -5 pts |

### Criterios de aprobación

- Mínimo **70 puntos** para aprobar
- Mínimo **70%** en cada evidencia (conocimiento, desempeño, producto)
- Entrega puntual (penalización del 10% por día de retraso)
