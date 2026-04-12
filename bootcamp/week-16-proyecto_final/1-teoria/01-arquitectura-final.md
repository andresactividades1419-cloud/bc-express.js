# Arquitectura Final — Todo en Contexto

## 🎯 Objetivos

- Comprender cómo se integran todas las capas del bootcamp en una sola API
- Tomar decisiones de arquitectura fundamentadas con los patrones aprendidos
- Identificar responsabilidades claras entre cada capa

---

## 1. Las Capas y sus Responsabilidades

Después de 15 semanas, la arquitectura de tu API debe verse así:

```
src/
├── routes/           # Semana 02–03: registra paths y métodos HTTP
├── middlewares/      # Semana 04–07: auth, validate, error handler
├── controllers/      # Semana 03: recibe req/res, delega al service
├── services/         # Semana 03: lógica de negocio pura (sin HTTP)
├── repositories/     # Semana 03/05: acceso a datos (Prisma/Mongoose)
├── validators/       # Semana 04: schemas Zod para inputs
├── utils/            # Sem. 07: JWT helpers, formatters
├── types/            # Sem. 03: interfaces y tipos globales
├── lib/              # Sem. 05/15: prisma client, logger (Winston)
└── config/           # Sem. 01: variables de entorno validadas con Zod
```

### Regla de Oro: La Dirección de las Dependencias

Las dependencias **solo fluyen hacia abajo**. Una capa no debe importar de la capa superior:

```
routes → controllers → services → repositories → prisma
```

El Service **nunca importa Express** (`Request`, `Response`). Esa es la señal de que la arquitectura está bien separada.

```ts
// ❌ MAL — el service conoce Express
import { Request } from 'express';
async function createBook(req: Request) { ... }

// ✅ BIEN — el service solo conoce el DTO
async function createBook(dto: CreateBookDto): Promise<Book> { ... }
```

---

## 2. Mapa de Conceptos por Semana

| Capa / Concepto | Semana | Responsabilidad |
|-----------------|--------|-----------------|
| Express + routing | 02 | Registrar endpoints y sus handlers |
| REST + HTTP contracts | 03 | Status codes correctos, contratos de respuesta |
| Zod validation | 04 | Validar inputs en el límite del sistema (controller) |
| Error handler global | 04 | Capturar cualquier error no controlado |
| PostgreSQL + Prisma | 05 | Persistencia relacional, migraciones, relaciones |
| MongoDB + Mongoose | 06 | Persistencia documental (alternativa) |
| JWT + bcrypt | 07 | Identidad del usuario, tokens de sesión |
| RBAC + Helmet | 08 | Control de acceso por rol, seguridad HTTP headers |
| Jest + Supertest | 09 | Probar que los contratos de API se cumplen |
| Multer + S3 | 10 | Archivos de usuarios en almacenamiento externo |
| Socket.io | 11 | Comunicación en tiempo real (canal bidireccional) |
| Redis | 12 | Cache de respuestas costosas, rate limit distribuido |
| OpenAPI/Swagger | 13 | Documentar y comunicar el contrato de API |
| Docker | 14 | Empaquetar la app en un artefacto reproducible |
| CI/CD | 15 | Automatizar verificación y despliegue |

---

## 3. Decisiones de Arquitectura (ADR)

Un **Architecture Decision Record (ADR)** documenta por qué tomaste una decisión técnica. En la presentación del proyecto final, deberás justificar al menos 3:

### Ejemplo de ADR mínimo

```markdown
## ADR-001: JWT en Authorization header + Refresh en Cookie HttpOnly

**Contexto**: Los clientes SPA no pueden leer cookies en todos los escenarios.

**Decisión**: Access token en `Authorization: Bearer` header (accesible
por JS) + refresh token en cookie `HttpOnly; Secure; SameSite=Strict`.

**Consecuencias**:
- Access token expira en 15 min → daño limitado si es interceptado
- Refresh token no es legible por JS → protegido contra XSS
- El cliente debe renovar automáticamente antes de expiración
```

### Preguntas guía para tus ADRs

1. ¿Por qué elegiste PostgreSQL y no MongoDB para tu dominio?
2. ¿Por qué implementaste soft delete en lugar de hard delete?
3. ¿Qué endpoints requieren autenticación y por qué?
4. ¿En qué datos agregarías caché Redis si tuvieras más tiempo?

---

## 4. Señales de Código Bien Arquitecturado

| ✅ Bien | ❌ Problema |
|---------|-----------|
| Controller llama `service.create(dto)` | Controller llama `prisma.book.create()` directamente |
| Service retorna entidades del dominio | Service retorna `Response` de Express |
| Validators en archivos `*.schema.ts` separados | Validación inline en el controller |
| `AppError` en services para errores de dominio | `res.status(400)...` dentro del service |
| `env.ts` con Zod para validar variables | `process.env.JWT_SECRET!` disperso en el código |

---

## 5. Arquitectura de Autenticación Completa

```
POST /api/v1/auth/register
  → validate(registerSchema)
  → authController.register
  → authService.register(dto)
    → prisma.user.findUnique (check email unique)
    → bcrypt.hash(password, 12)
    → prisma.user.create
    → generateAccessToken({ userId, role })
    → generateRefreshToken({ userId, role })
    → bcrypt.hash(refreshToken) → guardar en DB
    → return { user, accessToken, refreshToken }
  → res.cookie('refreshToken', refreshToken, { httpOnly, secure, sameSite })
  → res.status(201).json({ user, accessToken })
```

Este flujo es la referencia para tu proyecto final. La implementación
completa está en el starter de semana 16.

---

## ✅ Checklist de Verificación

- [ ] El service no importa nada de Express
- [ ] Cada capa tiene una responsabilidad única
- [ ] ADR documentado para las 3 decisiones más importantes
- [ ] Sin lógica de negocio en controllers
- [ ] Sin queries directas a Prisma fuera del repository
