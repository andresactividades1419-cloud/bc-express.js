# Schemas reutilizables, seguridad y organización

## 🎯 Objetivos

- Definir schemas en `components/schemas` para reutilizarlos con `$ref`
- Configurar `BearerAuth` como security scheme para JWT
- Aplicar seguridad a nivel de operación y de spec global
- Organizar los endpoints con `tags` y aplicar versionado de API

---

## 1. Schemas en `components`

Los schemas reutilizables se definen en el objeto `components.schemas` de la
`swaggerDefinition`. Esto evita repetir el mismo YAML en cada operación.

```typescript
// src/config/swagger.ts
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: { title: 'My API', version: '1.0.0' },
    components: {
      schemas: {
        // Schema del recurso principal
        Product: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id:          { type: 'string', example: 'clh2xyz' },
            name:        { type: 'string', example: 'Laptop Pro' },
            description: { type: 'string', example: 'High-performance laptop' },
            price:       { type: 'number', format: 'float', example: 999.99 },
            stock:       { type: 'integer', example: 10, default: 0 },
            createdAt:   { type: 'string', format: 'date-time' },
          },
        },
        // Schema de error genérico
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Resource not found' },
          },
        },
        // Schema de creación (sin id ni createdAt)
        CreateProductDto: {
          type: 'object',
          required: ['name'],
          properties: {
            name:  { type: 'string', example: 'USB-C Hub' },
            price: { type: 'number', example: 29.99 },
            stock: { type: 'integer', default: 0 },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};
```

Uso en rutas con `$ref`:
```yaml
# En un bloque @openapi dentro de un route file
schema:
  $ref: '#/components/schemas/Product'
```

---

## 2. Security Scheme: Bearer JWT

Agrega el `BearerAuth` security scheme en `components.securitySchemes`:

```typescript
components: {
  securitySchemes: {
    BearerAuth: {
      type: 'http',        // tipo de autenticación HTTP
      scheme: 'bearer',    // esquema bearer
      bearerFormat: 'JWT', // solo informativo (no valida el token)
    },
  },
},
```

Esto habilita el botón **Authorize** en Swagger UI donde el usuario puede
ingresar el token JWT para probar endpoints protegidos.

---

## 3. Aplicar seguridad a endpoints individuales

```typescript
/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     security:
 *       - BearerAuth: []       ← aplica solo a esta operación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized — token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authMiddleware, productController.create);
```

Para rutas **públicas** en una API que tiene security global, usa `security: []`
para indicar explícitamente que no requiere autenticación:

```typescript
/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and get JWT token
 *     security: []         ← sobrescribe el security global (pública)
 */
```

---

## 4. Seguridad global vs. por operación

| Nivel | Sintaxis | Comportamiento |
|-------|----------|----------------|
| **Global** (en `definition`) | `security: [{ BearerAuth: [] }]` | Aplica a todos los endpoints por defecto |
| **Por operación** (en `@openapi`) | `security: [{ BearerAuth: [] }]` | Sobrescribe el global para esa operación |
| **Ruta pública** (en `@openapi`) | `security: []` | Cancela el security global para esa operación |

---

## 5. Organización con tags

Declara los `tags` en la definición base para añadir descripciones:

```typescript
definition: {
  // ...
  tags: [
    { name: 'Products', description: 'Gestión del catálogo de productos' },
    { name: 'Auth',     description: 'Registro, login y renovación de tokens' },
  ],
},
```

En cada operación, asigna el tag:
```yaml
tags: [Products]
```

Swagger UI agrupa todos los endpoints del mismo tag en un acordeón expandible.

---

## 6. Versionado de API

Convenciones habituales:

| Estrategia | Ejemplo | Ventaja |
|------------|---------|---------|
| **URL path** (más común) | `/api/v1/products`, `/api/v2/products` | Simple, visible en URLs |
| **Header** | `Accept: application/vnd.api+json; version=2` | URLs limpias |
| **Query param** | `?version=2` | Fácil de probar |

En OpenAPI, cada versión puede tener su propia spec:

```typescript
// swagger-v1.ts → swaggerSpec para /api-docs/v1
// swagger-v2.ts → swaggerSpec para /api-docs/v2
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpecV1));
app.use('/api-docs/v2', swaggerUi.serve, swaggerUi.setup(swaggerSpecV2));
```

En el bootcamp usamos un solo `servers[].url` con `/api/v1` como prefijo base.

---

## ✅ Checklist de verificación

- [ ] `Product`, `Error` y el DTO de creación definidos en `components.schemas`
- [ ] `BearerAuth` definido en `components.securitySchemes`
- [ ] Los endpoints protegidos tienen `security: [{BearerAuth: []}]`
- [ ] Los endpoints públicos tienen `security: []` si la spec tiene security global
- [ ] Todos los endpoints tienen al menos un `tag`
- [ ] Los `tags` están declarados con descripción en `definition.tags`
