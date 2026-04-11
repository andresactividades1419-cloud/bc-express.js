# Rúbrica de Evaluación — Semana 09: Testing

## Distribución de Puntos

| Tipo de Evidencia | Porcentaje |
|-------------------|-----------|
| 🧠 Conocimiento   | 30%        |
| 💪 Desempeño      | 40%        |
| 📦 Producto       | 30%        |

---

## 🧠 Conocimiento (30%) — Evaluación Teórica

Cuestionario de 10 preguntas:

1. ¿Cuál es la diferencia entre un test unitario y un test de integración?
2. ¿Por qué se usa `jest.mock()` para aislar unidades de código?
3. ¿Qué hace `jest.fn()` y cómo se verifica si fue llamada?
4. ¿Cuál es la diferencia entre `toBe` y `toEqual` en Jest?
5. ¿Por qué Supertest no necesita que el servidor escuche en un puerto real?
6. ¿Qué es `mongodb-memory-server` y por qué se usa en tests?
7. ¿Qué información muestra el reporte de cobertura de Jest?
8. ¿Cuál es la diferencia entre `beforeEach` y `beforeAll`?
9. ¿Qué hace `mockResolvedValue` vs `mockReturnValue`?
10. ¿Qué es el patrón AAA (Arrange, Act, Assert) en testing?

---

## 💪 Desempeño (40%)

### Ejercicio 01: Unit Tests (20 puntos)

| Criterio | Puntos |
|----------|--------|
| `describe` y `it` correctamente estructurados | 3 |
| `jest.mock()` aplicado al repository con módulo completo | 4 |
| Test de registro exitoso: mock + assertion correcta | 4 |
| Test de login con contraseña inválida → `AppError(401)` | 4 |
| Test de email duplicado → `AppError(409)` | 3 |
| `mockResolvedValue` / `mockResolvedValueOnce` usados apropiadamente | 2 |

### Ejercicio 02: Integration Tests (20 puntos)

| Criterio | Puntos |
|----------|--------|
| `mongodb-memory-server` configurado en `beforeAll/afterAll` | 4 |
| `afterEach` limpia la base de datos correctamente | 3 |
| `POST /auth/register` → 201 con datos correctos | 3 |
| `POST /auth/register` → 409 con email duplicado | 3 |
| `POST /auth/login` → 200 con `accessToken` en respuesta | 4 |
| `GET /auth/me` → 200 con token válido en Authorization header | 3 |

---

## 📦 Producto (100 puntos)

### Proyecto Semanal: API con Test Suite Completa

| Criterio | Puntos |
|----------|--------|
| `jest.config.ts` configurado correctamente con ts-jest | 5 |
| Unit tests para el servicio principal del dominio (create, findById) | 15 |
| Unit tests para casos de error (not found, conflict) | 10 |
| Integration tests para `POST` del recurso (201, 422 validation) | 15 |
| Integration tests para `GET` del recurso (200, 404) | 10 |
| Integration tests para `DELETE` con requireRole: 403 sin admin | 10 |
| Cobertura de líneas ≥ 80% en servicios y controllers | 15 |
| `beforeAll/afterEach/afterAll` correctamente implementados | 5 |
| Todos los tests pasan (`pnpm test`) sin errores | 10 |
| README con instrucciones para ejecutar tests | 5 |

### Penalizaciones

| Infracción | Penalización |
|------------|-------------|
| Tests que testean implementación de librerías externas (mongoose, bcrypt) | -10 pts |
| No mockear dependencias en unit tests | -15 pts |
| Tests que fallan al ejecutar | -5 pts por test fallido |
| Base de datos real usada en tests (sin memory server) | -20 pts |
| Cobertura < 60% | -20 pts |

---

## ✅ Criterios de Aprobación

- Mínimo **70%** en cada tipo de evidencia
- Todos los tests pasan con `pnpm test`
- Cobertura ≥ 80% en archivos testeados
- Tests reproducibles: corren igual en cualquier máquina
