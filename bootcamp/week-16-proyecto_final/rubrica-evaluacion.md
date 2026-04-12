# Rúbrica de Evaluación — Semana 16: Proyecto Final Integrador

**Total de puntos**: 100 | **Ponderación del bootcamp**: Producto 30% · Desempeño 40% · Conocimiento 30%

---

## 🧠 Evaluación de Conocimiento (30%)

Cuestionario de 10 preguntas tipo selección múltiple o respuesta corta.

### Preguntas clave

1. ¿Cuál es la diferencia entre autenticación y autorización en una API REST?
2. ¿Por qué almacenamos el refresh token con bcrypt en la base de datos?
3. ¿Qué ventaja tiene un access token de vida corta (15 min)?
4. Explica qué hace el middleware `authenticate` y qué hace el middleware `authorize`.
5. ¿Por qué la capa Service no debe importar directamente `Request` o `Response` de Express?
6. ¿Qué devuelve un endpoint cuando hay un error de validación Zod y por qué ese status code?
7. ¿Qué hace `pnpm install --frozen-lockfile` diferente a `pnpm install` estándar?
8. ¿Por qué el `HEALTHCHECK` en el Dockerfile retorna exit 1 en lugar de lanzar una excepción?
9. ¿Qué significa que un artefacto Docker sea inmutable en el contexto de CI/CD?
10. ¿Qué información devuelve `GET /health` cuando la base de datos no responde, y por qué ese status HTTP?

---

## 💪 Evaluación de Desempeño (40%) — Ejercicio de Code Review

### Criterios por PASO

| Criterio | Excelente (4) | Bueno (3) | Suficiente (2) | Insuficiente (1) |
|----------|--------------|-----------|----------------|------------------|
| **PASO 1 — Validación** | Identifica todos los inputs sin validar y agrega Zod correctamente | Valida la mayoría de inputs | Valida algún input | No detecta problemas de validación |
| **PASO 2 — Manejo de errores** | Implementa error handler global y diferencia errores operacionales de de sistema | Implementa error handler | Parcialmente | No implementa |
| **PASO 3 — Seguridad** | Agrega Helmet, CORS y rate limiting con configuración correcta | Agrega Helmet y CORS | Solo Helmet | No detecta problemas de seguridad |
| **PASO 4 — Arquitectura** | Extrae lógica a service y repository, controller solo maneja req/res | Extrae lógica a service | Extrae lógica parcialmente | No refactoriza |

---

## 📦 Evaluación de Producto (30%) — Proyecto Final

### Rúbrica Completa (100 puntos)

#### Autenticación — 15 pts

| Criterio | Pts |
|----------|-----|
| `POST /api/v1/auth/register` funciona con hash bcrypt y retorna tokens | 5 |
| `POST /api/v1/auth/login` valida credenciales y retorna access + refresh token | 5 |
| `POST /api/v1/auth/refresh` renueva access token usando refresh token (cookie HttpOnly) | 5 |

#### CRUD del recurso de dominio — 20 pts

| Criterio | Pts |
|----------|-----|
| `GET /api/v1/:resource` retorna lista paginada (`page`, `limit`) | 5 |
| `GET /api/v1/:resource/:id` retorna recurso o `404` si no existe | 3 |
| `POST /api/v1/:resource` crea recurso validando con Zod, retorna `201` | 5 |
| `PUT /api/v1/:resource/:id` actualiza recurso, retorna `404` si no existe | 4 |
| `DELETE /api/v1/:resource/:id` elimina / desactiva recurso, retorna `204` | 3 |

#### Validación y errores — 10 pts

| Criterio | Pts |
|----------|-----|
| Inputs inválidos retornan `400` con cuerpo `{ errors: ... }` | 4 |
| Errores no controlados son capturados por el middleware global | 3 |
| Stack trace no aparece en respuestas JSON de producción | 3 |

#### Autorización RBAC — 10 pts

| Criterio | Pts |
|----------|-----|
| Rutas protegidas requieren token válido (`401` sin token) | 4 |
| Rutas de admin retornan `403` para usuarios con rol USER | 3 |
| Roles definidos como enum en Prisma schema (USER / ADMIN) | 3 |

#### Tests en CI — 15 pts

| Criterio | Pts |
|----------|-----|
| Mínimo 5 assertions de integración con Supertest | 5 |
| Tests cubren casos de éxito y error (al menos 1 cada uno) | 5 |
| Pipeline CI corre los tests en cada push/PR (badge verde) | 5 |

#### Docker + CI/CD + Deploy — 15 pts

| Criterio | Pts |
|----------|-----|
| `Dockerfile` multi-stage compila TypeScript y corre como `node` (no root) | 5 |
| `GET /health` en URL pública retorna `200 OK` con verificación de DB | 5 |
| Push a `main` dispara redeploy automático en Railway/Render | 5 |

#### Calidad de código — 10 pts

| Criterio | Pts |
|----------|-----|
| Arquitectura en capas (routes → controllers → services → repositories) | 4 |
| TypeScript strict sin `any` explícito | 3 |
| Sin secretos hardcodeados — solo variables de entorno | 3 |

#### README + documentación — 5 pts

| Criterio | Pts |
|----------|-----|
| README con: descripción, stack, endpoints, cómo correr en local, badge CI | 3 |
| Colección Postman/Thunder Client exportada o Swagger en `/api/docs` | 2 |

---

## ✅ Checklist Antes de Entregar

- [ ] `pnpm build` sin errores TypeScript
- [ ] `pnpm test` en verde localmente y en CI
- [ ] `docker build -t mi-api .` compila sin errores
- [ ] URL pública: `curl https://mi-api.PLATAFORMA.app/health` → `200 OK`
- [ ] No hay `.env` commiteado (solo `.env.example`)
- [ ] Badge CI en el README del proyecto
- [ ] Colección Postman o link a `/api/docs` con Swagger
- [ ] Presentación de 5 min preparada (arquitectura + decisiones + demo)
