# Code Review — Cómo Revisar y Mejorar Código

## 🎯 Objetivos

- Aplicar un checklist de code review en el contexto de APIs Express
- Identificar los problemas más comunes en código de bootcamp
- Preparar un Pull Request listo para revisión

---

## 1. ¿Qué es Code Review?

Code review es el proceso de leer código escrito por otro desarrollador
(o por ti mismo en el futuro) para encontrar problemas antes de que lleguen
a producción.

En equipos reales, **ningún código llega a `main` sin revision**.
El flujo estándar es:

```
feature branch → PR → revisión → comentarios → fixes → aprobación → merge
```

---

## 2. Checklist de Code Review para APIs Express

### 🔐 Seguridad (semana 08)

- [ ] `helmet()` aplicado globalmente antes de las rutas
- [ ] `cors({ origin: env.CORS_ORIGIN })` — no `origin: '*'` en producción
- [ ] Rate limiting en rutas públicas y de autenticación
- [ ] Inputs validados con Zod antes de llegar al service
- [ ] Contraseñas hasheadas con bcrypt (nunca plano)
- [ ] Secretos solo en variables de entorno (nunca hardcodeados)
- [ ] Tokens JWT con `expiresIn` definido

### 🏗️ Arquitectura (semana 03)

- [ ] Controller no contiene lógica de negocio
- [ ] Service no importa `Request` o `Response`
- [ ] Repository es la única capa que toca Prisma/Mongoose
- [ ] Errores de dominio lanzados como `AppError` (no `res.status()` en service)
- [ ] Rutas registradas en archivos separados por recurso

### 🧪 Calidad de código

- [ ] Funciones con un solo nivel de abstracción
- [ ] Sin `console.log` activos — usar `logger.debug()`
- [ ] Variables y funciones con nombres descriptivos
- [ ] Sin `any` explícito en TypeScript
- [ ] Sin código comentado sin razón (`// old code` no es documentación)

### 🗃️ Base de datos (semana 05)

- [ ] Campos sensibles excluidos del `select` en respuestas (password, refreshToken)
- [ ] Uso de `findUnique` o `findFirst` con criterio específico — no `findMany` y filtrar en JS
- [ ] Paginación implementada en endpoints de listado

### 📋 Respuestas HTTP (semana 03)

- [ ] `201` al crear recursos, `204` al eliminar
- [ ] `404` cuando el recurso no existe (no `400`)
- [ ] `401` cuando no hay token, `403` cuando hay token pero sin permisos
- [ ] Respuestas consistentes: `{ data }` para éxito, `{ error }` para errores

---

## 3. Problemas Frecuentes en Código de Bootcamp

### Problema 1 — Lógica en el router

```ts
// ❌ Route handler demasiado largo
app.post('/books', async (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: 'Title required' });
  const book = await prisma.book.create({ data: req.body });
  res.json(book);
});

// ✅ Router delgado
router.post('/', validate(createBookSchema), bookController.create);
```

### Problema 2 — Sin manejo de errores

```ts
// ❌ Unhandled rejection — Express 5 lo captura pero sin formato
async function getBook(req, res) {
  const book = await prisma.book.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json(book);  // si no existe, lanza P2025 sin formato legible
}

// ✅ Lanzar AppError con status legible
async function getBook(req: Request, res: Response, next: NextFunction) {
  const book = await bookService.getById(req.params.id);
  if (!book) return next(new AppError(404, 'Book not found'));
  res.json({ data: book });
}
```

### Problema 3 — Exponer datos sensibles

```ts
// ❌ El password llega al cliente
const user = await prisma.user.findUnique({ where: { id } });
res.json(user);

// ✅ Excluir campos sensibles explícitamente
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, email: true, name: true, role: true, createdAt: true },
});
res.json({ data: user });
```

### Problema 4 — Variables de entorno sin validar

```ts
// ❌ Falla silenciosamente si JWT_SECRET no existe
const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '15m' });

// ✅ Falla en el arranque si falta la variable
import { env } from '../config/env'; // Zod valida al iniciar la app
const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '15m' });
```

---

## 4. Cómo Escribir un Buen PR

Un PR bien redactado facilita la revisión y acelera el merge.

### Título

```
feat(books): add pagination to GET /api/v1/books
fix(auth): return 401 on expired refresh token
refactor(user): move password hash to auth service
```

### Descripción mínima

```markdown
## Cambios
- Agrega `page` y `limit` como query params con Zod
- Devuelve `{ data, total, page, totalPages }` en la respuesta
- Tests actualizados para verificar la paginación

## Cómo probar
GET /api/v1/books?page=1&limit=10

## Screenshot / Output
{ "data": [...], "total": 42, "page": 1, "totalPages": 5 }
```

---

## 5. Revisión de Código de un Compañero — Guía Práctica

Cuando revises el código de otro aprendiz, sé:

- **Específico**: "Esta función hace 3 cosas" en lugar de "está mal"
- **Constructivo**: sugiere la solución, no solo el problema
- **Empático**: todos están aprendiendo — el tono importa

```markdown
// ✅ Comentario constructivo en PR
Considera mover la lógica de hash a `authService.register()` 
para que el controller quede así:
  const result = await authService.register(req.body);
  res.status(201).json(result);

Esto hace más fácil testear el service de forma unitaria.
```

---

## ✅ Checklist de Verificación

- [ ] Revisé el código propio con el checklist antes de abrir el PR
- [ ] Mi PR tiene título descriptivo y descripción con los cambios
- [ ] No hay secretos, `console.log` activos ni código comentado sin razón
- [ ] El código compilado sin errores TypeScript antes de hacer push
