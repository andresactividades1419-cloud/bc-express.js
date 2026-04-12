# Swagger en Express: swagger-jsdoc + swagger-ui-express

## 🎯 Objetivos

- Instalar y configurar `swagger-jsdoc` para generar la spec desde JSDoc
- Montar `swagger-ui-express` en una aplicación Express 5
- Entender el flujo completo: código → spec → UI
- Personalizar la UI y exponer la spec como JSON

---

## 1. Instalación

```bash
pnpm add swagger-ui-express@5.0.1 swagger-jsdoc@6.2.8
pnpm add -D @types/swagger-ui-express@4.1.8 @types/swagger-jsdoc@6.0.4
```

---

## 2. Configurar swagger-jsdoc

Crea `src/config/swagger.ts` con la definición base de la API:

```typescript
import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API REST construida con Express 5 y TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    // Los components (schemas, securitySchemes) se agregan aquí
    // o se pueden definir en archivos separados con @openapi
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Glob de archivos donde swagger-jsdoc buscará bloques @openapi
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

// swaggerSpec es el objeto OpenAPI generado - se exporta y usa en app.ts
export const swaggerSpec = swaggerJsdoc(options);
```

> **`apis`**: array de globs que apunta a los archivos con JSDoc `@openapi`.
> swagger-jsdoc los lee en tiempo de ejecución (no en compilación).

---

## 3. Montar Swagger UI en Express

En `src/app.ts`, registra la UI antes del error handler:

```typescript
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

// Servir Swagger UI en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Exponer la spec como JSON (útil para herramientas externas)
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(swaggerSpec);
});
```

Ahora accede a `http://localhost:3000/api-docs` en el navegador y verás la UI.

---

## 4. Opciones de personalización

```typescript
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'My API Docs',          // título de la pestaña
    customCss: '.swagger-ui .topbar { display: none }', // ocultar topbar
    swaggerOptions: {
      persistAuthorization: true,            // mantener el token entre recargas
      defaultModelsExpandDepth: 1,           // profundidad de schemas en UI
    },
  }),
);
```

---

## 5. Estructura recomendada de archivos

```
src/
├── config/
│   ├── env.ts
│   └── swagger.ts         ← definición base + securitySchemes
├── routes/
│   ├── product.routes.ts  ← @openapi para rutas de productos
│   └── auth.routes.ts     ← @openapi para rutas de auth
└── app.ts                 ← monta swaggerUi.serve + setup
```

La spec se construye en runtime combinando:
1. `definition` (base en `swagger.ts`)
2. Bloques `@openapi` de todos los archivos en `apis`

---

## 6. Verificar la spec generada

Abre `http://localhost:3000/api-docs.json` en el navegador o con curl:

```bash
curl http://localhost:3000/api-docs.json | jq '.paths | keys'
# ["\/api\/v1\/products", "\/api\/v1\/products\/{id}", ...]
```

Si la spec está vacía o el path no aparece, verifica:
- El glob en `apis` apunta a los archivos correctos
- El JSDoc tiene el formato correcto (ver sección de teoría 03)
- No hay errores de sintaxis YAML en los comentarios

---

## ✅ Checklist de verificación

- [ ] `swagger-jsdoc` y `swagger-ui-express` instalados y tipados
- [ ] `swagger.ts` con `openapi: '3.1.0'`, `info`, `servers` y `apis`
- [ ] `/api-docs` accesible y carga Swagger UI
- [ ] `/api-docs.json` devuelve el objeto spec como JSON
- [ ] `persistAuthorization: true` activado para no perder el token al recargar
