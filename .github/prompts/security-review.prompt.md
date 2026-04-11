---
name: "Security review"
description: "Revisa el código de una semana o archivo específico aplicando OWASP Top 10 en contexto de APIs REST con Express. Detecta vulnerabilidades y sugiere correcciones concretas."
argument-hint: "Ruta del archivo o carpeta a revisar (ej: bootcamp/week-07/3-proyecto/starter/src)"
mode: "agent"
---

# Security Review — OWASP Top 10 para APIs REST con Express

Revisa el código indicado aplicando los 10 riesgos de seguridad más críticos según OWASP, adaptados al stack del bootcamp (Node.js 22, Express 5, TypeScript, Prisma, JWT, PostgreSQL).

## OWASP A01 — Broken Access Control

**Riesgos en Express:**

- Rutas sin middleware de autenticación (`authMiddleware`)
- Acceso a recursos de otro usuario sin verificar ownership
- Roles no validados antes de operaciones sensibles (RBAC)

**Checklist:**

- [ ] ¿Todas las rutas protegidas tienen `authMiddleware`?
- [ ] ¿El controlador verifica que `req.user.id === resource.userId`?
- [ ] ¿Los endpoints de admin verifican el rol con `requireRole('admin')`?
- [ ] ¿Hay rutas accesibles sin autenticación que deberían estar protegidas?

**Ejemplo de corrección:**

```ts
// ❌ Sin control de acceso
router.delete("/items/:id", itemsController.remove);

// ✅ Con autenticación y verificación de ownership
router.delete("/items/:id", authMiddleware, itemsController.remove);

// En el controller:
if (item.userId !== req.user!.id) {
  res.status(403).json({ message: "Forbidden" });
  return;
}
```

---

## OWASP A02 — Cryptographic Failures

**Riesgos en Express:**

- Contraseñas almacenadas en texto plano o con hash débil (MD5, SHA1)
- JWT en `localStorage` (si hay frontend) en lugar de cookie HttpOnly
- Secretos de JWT hardcodeados en el código fuente
- Conexiones a DB sin TLS en producción

**Checklist:**

- [ ] ¿Las contraseñas usan `bcrypt.hash(password, 12)`? (mínimo 10 rounds)
- [ ] ¿El JWT va en cookie HttpOnly + Secure + SameSite=Strict?
- [ ] ¿`JWT_SECRET` viene de variable de entorno (no hardcodeado)?
- [ ] ¿El `.env` está en `.gitignore`? ¿Existe `.env.example`?
- [ ] ¿No hay credenciales en logs ni en respuestas de error?

**Ejemplo de corrección:**

```ts
// ❌ Secreto hardcodeado
const token = jwt.sign(payload, "mysecret123", { expiresIn: "15m" });

// ✅ Variable de entorno validada con Zod en config/env.ts
const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "15m" });

// ❌ Cookie sin flags de seguridad
res.cookie("token", token);

// ✅ Cookie segura
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

---

## OWASP A03 — Injection

**Riesgos en Express:**

- SQL injection en queries manuales (sin Prisma)
- NoSQL injection en queries de Mongoose sin sanitización
- Command injection en `exec()` o `spawn()` con input del usuario
- XSS por renderizado de HTML sin sanitización

**Checklist:**

- [ ] ¿Se usa Prisma con queries tipadas (nunca `$queryRawUnsafe`)?
- [ ] ¿Si hay queries raw de Prisma, usan parámetros `$queryRaw\`SELECT...\${param}\``?
- [ ] ¿Los inputs se validan con Zod antes de pasar al servicio?
- [ ] ¿Mongoose usa `sanitize-mongo-query` o similar?
- [ ] ¿No se usan `eval()`, `Function()`, o `exec()` con input del usuario?

**Ejemplo de corrección:**

```ts
// ❌ Query raw insegura
const users = await prisma.$queryRawUnsafe(
  `SELECT * FROM users WHERE email = '${email}'`,
);

// ✅ Query parametrizada (inmune a SQL injection)
const users = await prisma.$queryRaw`
  SELECT * FROM users WHERE email = ${email}
`;

// ✅ Mejor: usar el ORM directamente
const user = await prisma.user.findUnique({ where: { email } });
```

---

## OWASP A04 — Insecure Design

**Riesgos en Express:**

- Sin rate limiting en endpoints de auth (brute force)
- Sin paginación (permite exfiltración de toda la DB)
- Lógica de negocio sensible expuesta en el frontend

**Checklist:**

- [ ] ¿`/auth/login` y `/auth/register` tienen rate limiting estricto?
- [ ] ¿Todos los endpoints de listado tienen paginación obligatoria?
- [ ] ¿Los precios/permisos se calculan en el servidor, no en el cliente?

---

## OWASP A05 — Security Misconfiguration

**Riesgos en Express:**

- Sin Helmet (headers HTTP inseguros)
- CORS permisivo (`origin: '*'`) en producción
- Stack traces expuestos en respuestas de error
- Puerto y versión de Express expuestos en headers

**Checklist:**

- [ ] ¿`app.use(helmet())` está antes de todas las rutas?
- [ ] ¿CORS tiene `origin` explícito en producción (no `'*'`)?
- [ ] ¿El middleware de error global NO incluye `stack` en la respuesta de producción?
- [ ] ¿`app.disable('x-powered-by')` o está configurado con Helmet?

**Ejemplo de corrección:**

```ts
// ❌ CORS abierto + sin Helmet
app.use(cors());

// ✅ Helmet + CORS configurado
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") ?? [],
    credentials: true,
  }),
);

// ❌ Stack trace en producción
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

// ✅ Sin stack en producción
app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode ?? 500;
  res.status(statusCode).json({
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
```

---

## OWASP A06 — Vulnerable and Outdated Components

**Riesgos en Express:**

- Dependencias con CVEs conocidos
- Versiones flotantes en `package.json` (`^`, `~`, `*`)
- Node.js desactualizado (sin LTS activo)

**Checklist:**

- [ ] ¿`pnpm audit --audit-level moderate` pasa sin vulnerabilidades?
- [ ] ¿Todas las dependencias en `package.json` tienen versiones exactas (sin `^`, `~`)?
- [ ] ¿Se usa Node.js 22 LTS (o la versión LTS activa)?
- [ ] ¿Hay un workflow de CI que ejecuta `pnpm audit`?

---

## OWASP A07 — Identification and Authentication Failures

**Riesgos en Express:**

- JWT sin expiración (`expiresIn` omitido)
- Access tokens de larga duración (>1 hora)
- Sin invalidación de refresh tokens en logout
- Contraseñas débiles aceptadas (sin validación de complejidad)

**Checklist:**

- [ ] ¿El access token expira en ≤15 minutos?
- [ ] ¿El refresh token tiene expiración (≤7 días)?
- [ ] ¿El logout elimina el refresh token de la DB/Redis?
- [ ] ¿El schema Zod de registro valida longitud mínima de contraseña (≥8 chars)?
- [ ] ¿Se usa `bcrypt.compare()` con tiempo constante (no `===`)?

---

## OWASP A08 — Software and Data Integrity Failures

**Riesgos en Express:**

- Deserialización de datos sin validación (JSON bodies sin Zod)
- Sin verificación de integridad en webhooks
- CI/CD que despliega sin revisar dependencias

**Checklist:**

- [ ] ¿Todos los `req.body` son validados con Zod antes de usar?
- [ ] ¿Los webhooks verifican la firma (ej. `X-Hub-Signature`)?
- [ ] ¿El pipeline de CI incluye `pnpm audit` y `pnpm test`?

---

## OWASP A09 — Security Logging and Monitoring Failures

**Riesgos en Express:**

- Sin logs de intentos de autenticación fallidos
- Logs con datos sensibles (contraseñas, tokens)
- Sin alertas para patrones anómalos (brute force detectado)

**Checklist:**

- [ ] ¿Se registran los 401/403 con IP y timestamp (usando Winston)?
- [ ] ¿Los logs NO incluyen passwords ni tokens completos?
- [ ] ¿Los errores 5xx tienen log de nivel `error` con contexto suficiente?

**Ejemplo:**

```ts
// ❌ Log con dato sensible
logger.info(`Login attempt: ${email} / ${password}`);

// ✅ Log sin dato sensible
logger.warn(`Failed login attempt for email: ${email}`, {
  ip: req.ip,
  userAgent: req.headers["user-agent"],
  timestamp: new Date().toISOString(),
});
```

---

## OWASP A10 — Server-Side Request Forgery (SSRF)

**Riesgos en Express:**

- Endpoints que aceptan URLs externas del usuario y las fetchen
- Sin allowlist de dominios para requests externos

**Checklist:**

- [ ] ¿Si hay endpoints que hacen fetch a URLs del usuario, tienen una allowlist de dominios?
- [ ] ¿No hay endpoints que expongan recursos internos (metadata de cloud, 169.254.x.x)?

---

## Instrucciones para el agente

1. Leer todos los archivos en la ruta indicada
2. Para cada riesgo OWASP, verificar los ítems del checklist
3. Reportar los **problemas encontrados** con:
   - Archivo y línea donde ocurre
   - Descripción del riesgo
   - Código actual problemático
   - Código corregido sugerido
4. Si no hay problemas en un área, indicar "✅ Sin problemas detectados"
5. Ordenar por severidad: Alto → Medio → Bajo
6. Al final, dar un **resumen ejecutivo** con el número de issues por categoría

## Ruta a revisar

$input
