# Documentación y Portfolio de Desarrollador

## 🎯 Objetivos

- Escribir un README profesional que comunique el valor del proyecto
- Documentar la API con Swagger/OpenAPI para consumidores externos
- Presentar el proyecto final con claridad en 5 minutos

---

## 1. El README Profesional

El README es la primera impresión del proyecto. Un reclutador o compañero
debería entender en 30 segundos qué hace y cómo correrlo.

### Estructura Recomendada

```markdown
# 📚 Biblioteca API  <!-- Nombre descriptivo + emoji del dominio -->

API REST para gestión de biblioteca: catálogo de libros, préstamos y usuarios.

![CI](https://github.com/TU_USUARIO/TU_REPO/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Stack
- **Runtime**: Node.js 22 + TypeScript 5
- **Framework**: Express 5
- **ORM**: Prisma + PostgreSQL
- **Auth**: JWT (access + refresh tokens) + bcrypt
- **Validación**: Zod
- **Tests**: Jest + Supertest
- **Deploy**: Railway · Docker multi-stage

## Endpoints principales
| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /api/v1/auth/register | Registro de usuario | No |
| POST | /api/v1/auth/login | Login | No |
| GET | /api/v1/books | Listar libros (paginado) | Bearer |
| POST | /api/v1/books | Crear libro | Admin |
| GET | /api/v1/books/:id | Obtener libro | Bearer |

## Cómo correr en local
\`\`\`bash
git clone https://github.com/TU_USUARIO/TU_REPO
cd TU_REPO
pnpm install
cp .env.example .env    # edita las variables
pnpm prisma migrate dev --name init
pnpm dev
# API en http://localhost:3000
# Swagger en http://localhost:3000/api/docs
\`\`\`

## Variables de entorno requeridas
Ver [.env.example](.env.example)

## URL de producción
https://mi-api.up.railway.app
```

---

## 2. Documentación de API con Swagger (OpenAPI)

De semana 13, ya conoces swagger-ui-express + openapi. Para el proyecto final,
el mínimo es documentar los endpoints de autenticación y del recurso principal.

### Setup básico (ya debería estar en el starter)

```ts
// src/app.ts
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

```ts
// src/config/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API — Dominio',
      version: '1.0.0',
      description: 'API REST para gestión de [tu dominio asignado]',
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
});
```

### Comentario JSDoc en ruta (semana 13)

```ts
/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Listar libros con paginación
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lista de libros
 *       401:
 *         description: Token inválido o ausente
 */
router.get('/', authenticate, bookController.getAll);
```

---

## 3. Colección Postman / Thunder Client

Si no implementas Swagger, exporta una colección de Postman con:

1. **Environment**: `base_url = https://mi-api.up.railway.app`
2. **Auth folder**: Register, Login (guarda el token), Refresh
3. **Resource folder**: GET list, GET by id, POST, PUT, DELETE
4. **Variables**: `{{base_url}}`, `{{access_token}}`

Exporta como JSON y agrégala al repositorio en `/docs/collection.json`.

---

## 4. La Presentación de 5 Minutos

### Estructura

| Tiempo | Sección | Contenido |
|--------|---------|-----------|
| 0:00–1:00 | Dominio | ¿Qué resuelve tu API? ¿Qué entidades tiene? |
| 1:00–2:00 | Arquitectura | Diagrama de capas, decisiones técnicas (3 ADRs) |
| 2:00–3:30 | Demo | Flujo completo: register → login → CRUD → error |
| 3:30–4:30 | CI/CD | Mostrar última build verde en GitHub Actions |
| 4:30–5:00 | Aprendizaje | ¿Qué fue lo más difícil? ¿Qué cambiarías? |

### Consejos para la demo en vivo

1. Có**rre la demo contra la URL de producción** (no localhost) — demuestra que el deploy funciona
2. Prepara los requests en Postman/Thunder Client antes de la presentación
3. Muestra un error intencional (ej: `POST` sin token → `401`) — demuestra que la seguridad funciona
4. Ten preparado el `GET /health` como primer request — demuestra que la DB está conectada

### El slide de arquitectura

Usa el SVG de [01-arquitectura-completa.svg](../0-assets/01-arquitectura-completa.svg)
como fondo y agrega los nombres de tus entidades concretas encima.

---

## 5. Tu Portfolio como Developer

El proyecto final es tu primera pieza de portfolio backend. Después de la presentación:

1. **Poner en GitHub público** con README completo
2. **Enlazar en LinkedIn** como "proyecto destacado"
3. **Agregar a tu CV** bajo "Proyectos: API REST — Node.js/Express/TypeScript"
4. **Describir la arquitectura en entrevistas**: menciona las decisiones de diseño

### Frase para entrevistas

> "Desarrollé una API REST para gestión de [dominio] usando Express 5 con TypeScript,
> arquitectura en capas, autenticación JWT con refresh tokens, validación Zod,
> tests de integración con Jest, Dockerizado y desplegado en Railway con CI/CD
> automatizado en GitHub Actions."

---

## ✅ Checklist de Verificación

- [ ] README con badge de CI, stack, endpoints y cómo correr en local
- [ ] Swagger en `/api/docs` O colección Postman en `/docs/`
- [ ] Demo preparada contra URL de producción
- [ ] Diagrama de arquitectura en el slide de presentación
- [ ] 3 ADRs documentados para justificar decisiones técnicas
