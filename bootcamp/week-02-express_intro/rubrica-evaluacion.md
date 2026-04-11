# Rúbrica de Evaluación — Semana 02: Express Intro

## 📊 Distribución de Evidencias

| Tipo | Peso | Instrumento |
|------|:----:|-------------|
| Conocimiento 🧠 | 30% | Cuestionario teórico (10 preguntas) |
| Desempeño 💪 | 40% | Ejercicios prácticos en clase |
| Producto 📦 | 30% | Proyecto semanal entregado |

**Nota mínima para aprobar**: 70% en cada tipo de evidencia

---

## 🧠 Conocimiento (30%)

### Cuestionario — Express Intro

| # | Pregunta | Puntaje |
|---|----------|:-------:|
| 1 | ¿Cuál es la diferencia entre un servidor HTTP nativo de Node.js y Express? | 10 |
| 2 | ¿Qué hace `app.use(express.json())` y por qué es necesario? | 10 |
| 3 | ¿Cuál es la diferencia entre `req.params`, `req.query` y `req.body`? | 10 |
| 4 | ¿Qué es un middleware en Express y cuál es su firma de función? | 10 |
| 5 | ¿Para qué sirve la función `next()` en un middleware? | 10 |
| 6 | ¿Qué código HTTP se debe retornar al crear un recurso exitosamente? | 10 |
| 7 | ¿Qué diferencia hay entre `app.ts` y `server.ts` en la arquitectura? | 10 |
| 8 | ¿Cómo se define una ruta con parámetro dinámico en Express? (ej. `/users/:id`) | 10 |
| 9 | ¿Qué ocurre si un middleware no llama a `next()` ni envía respuesta? | 10 |
| 10 | ¿Cuántos argumentos tiene un middleware de manejo de errores en Express? | 10 |

**Total**: 100 puntos → 30% de la nota final

---

## 💪 Desempeño (40%)

### Ejercicio 01 — Hello Express (20 puntos)

| Criterio | Puntaje |
|----------|:-------:|
| El servidor levanta en el puerto configurado sin errores TypeScript | 5 |
| Define las 4 rutas CRUD (GET all, GET by id, POST, PUT/PATCH, DELETE) | 5 |
| Lee `req.params` y `req.body` correctamente | 5 |
| Retorna los códigos HTTP correctos (200, 201, 204, 404) | 5 |
| **Subtotal** | **20** |

### Ejercicio 02 — Middleware Chain (20 puntos)

| Criterio | Puntaje |
|----------|:-------:|
| Implementa middleware de logging que muestra método, ruta y duración | 5 |
| Implementa middleware de autenticación ficticio con header `x-api-key` | 5 |
| Middleware de errores con 4 parámetros captura y formatea errores | 5 |
| El orden de los middlewares es correcto (logging → auth → routes → errors) | 5 |
| **Subtotal** | **20** |

---

## 📦 Producto (30%)

### Proyecto Semanal — API CRUD en Memoria

| Criterio | Descripción | Puntaje |
|----------|-------------|:-------:|
| **Servidor funcional** | `pnpm dev` levanta sin errores, responde en `localhost:3000` | 15 |
| **CRUD completo** | Los 5 endpoints implementados (GET all, GET/:id, POST, PUT/:id, DELETE/:id) | 20 |
| **Validación básica** | Verifica que los campos requeridos estén presentes en POST/PUT | 15 |
| **Códigos HTTP** | Usa 200, 201, 204, 400, 404 correctamente | 15 |
| **Middlewares** | `express.json()`, logger personalizado, error handler | 15 |
| **TypeScript** | `pnpm build` sin errores, tipos definidos para el recurso | 15 |
| **Dominio adaptado** | El recurso y los campos son coherentes con el dominio asignado | 5 |
| **Total** | | **100** |

### Penalizaciones

| Situación | Deducción |
|-----------|:---------:|
| Usa `npm` o `yarn` en lugar de `pnpm` | -10 |
| Versiones con `^` o `~` en `package.json` | -10 |
| Entrega tardía (por día) | -5 |
| `pnpm build` falla por errores TypeScript | -20 |
| Copia de implementación de otro aprendiz | -100 (reprobado) |
