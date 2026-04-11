# Rúbrica de Evaluación — Semana 01: Node.js Fundamentals

## 📊 Distribución de Evidencias

| Tipo | Peso | Instrumento |
|------|:----:|-------------|
| Conocimiento 🧠 | 30% | Cuestionario teórico (10 preguntas) |
| Desempeño 💪 | 40% | Ejercicios prácticos en clase |
| Producto 📦 | 30% | Proyecto semanal entregado |

**Nota mínima para aprobar**: 70% en cada tipo de evidencia

---

## 🧠 Conocimiento (30%)

### Cuestionario — Node.js Fundamentals

| # | Pregunta | Puntaje |
|---|----------|:-------:|
| 1 | ¿Qué es el Event Loop y cuál es su función en Node.js? | 10 |
| 2 | ¿Qué significa "non-blocking I/O" y por qué es importante? | 10 |
| 3 | ¿Cuál es la diferencia entre `import` (ESM) y `require` (CommonJS)? | 10 |
| 4 | ¿Para qué sirve `import.meta.url` en Node.js con ESM? | 10 |
| 5 | ¿Cómo se maneja un error en una función `async`/`await`? | 10 |
| 6 | ¿Qué ocurre si no se usa `await` al llamar una función asíncrona? | 10 |
| 7 | ¿Qué hace `"strict": true` en `tsconfig.json`? | 10 |
| 8 | ¿Por qué Node.js puede manejar miles de conexiones con un solo hilo? | 10 |
| 9 | ¿Qué diferencia hay entre `Promise.all` y `Promise.allSettled`? | 10 |
| 10 | ¿Cuál es la diferencia entre `setTimeout(fn, 0)` y `process.nextTick(fn)`? | 10 |

**Total**: 100 puntos → 30% de la nota final

---

## 💪 Desempeño (40%)

### Ejercicio 01 — Hello Node (20 puntos)

| Criterio | Puntaje |
|----------|:-------:|
| El script compila y ejecuta sin errores TypeScript | 5 |
| Lee el archivo JSON con `fs/promises` (no `fs.readFileSync`) | 5 |
| Usa `async`/`await` correctamente con `try`/`catch` | 5 |
| Muestra los datos procesados en consola con formato legible | 5 |
| **Subtotal** | **20** |

### Ejercicio 02 — Async Patterns (20 puntos)

| Criterio | Puntaje |
|----------|:-------:|
| Implementa correctamente el patrón con callbacks | 5 |
| Implementa correctamente el patrón con Promises | 5 |
| Implementa correctamente el patrón con async/await | 5 |
| Maneja errores en los tres patrones sin que el proceso crashee | 5 |
| **Subtotal** | **20** |

**Total Desempeño**: 40 puntos → 40% de la nota final

---

## 📦 Producto (30%)

### Proyecto Semanal — Procesador de Datos Node.js

| Criterio | Descripción | Puntaje |
|----------|-------------|:-------:|
| **Compilación** | El proyecto compila sin errores (`pnpm build`) | 10 |
| **Funcionalidad** | Lee el archivo de datos y procesa correctamente los registros | 20 |
| **Async** | Usa `async`/`await` en todas las operaciones de I/O | 15 |
| **TypeScript** | Tipos explícitos definidos para las estructuras de datos del dominio | 15 |
| **Error handling** | Maneja errores con `try`/`catch` y mensajes descriptivos | 15 |
| **Adaptación al dominio** | La implementación es coherente con el dominio asignado | 15 |
| **README** | El README describe la implementación y cómo ejecutarla | 10 |
| **Total** | | **100** |

### Penalizaciones

| Situación | Penalización |
|-----------|:------------:|
| Entrega fuera de plazo (por día) | -10 puntos |
| Uso de `any` sin justificación | -5 puntos por ocurrencia |
| Código copiado de otro aprendiz | Nota 0 en Producto |
| Uso de `require()` en lugar de `import` | -5 puntos |

---

## 📅 Fecha de Entrega

- **Ejercicios**: Al finalizar la sesión práctica
- **Proyecto**: 7 días después del inicio de la semana
- **Formato**: Pull Request al repositorio del aprendiz (rama `week-01`)
