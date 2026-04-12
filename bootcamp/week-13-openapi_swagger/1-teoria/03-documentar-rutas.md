# Documentar rutas con @openapi

## 🎯 Objetivos

- Escribir anotaciones `@openapi` correctas en comentarios JSDoc
- Documentar parámetros de ruta, query y body
- Definir respuestas tipadas con schemas inline y con `$ref`
- Documentar los cuatro verbos HTTP más comunes

---

## 1. Sintaxis básica de @openapi

Los bloques JSDoc con `@openapi` usan YAML dentro de comentarios.
**La indentación es crítica** — YAML requiere espacios consistentes.

```typescript
/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags: [Products]
 *     summary: List all products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   name: { type: string }
 */
router.get('/', productController.getAll);
```

> Cada línea del bloque YAML debe iniciarse con ` * ` (espacio-asterisco-espacio).

---

## 2. Parámetros de ruta (path)

```typescript
/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: CUID del producto
 *         schema:
 *           type: string
 *           example: "clh2xyz123"
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getById);
```

---

## 3. Query parameters

```typescript
/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags: [Products]
 *     summary: List products with cursor pagination
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         description: ID del último elemento de la página anterior
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *     responses:
 *       200:
 *         description: Paginated product list
 */
```

---

## 4. Request Body (POST / PUT)

```typescript
/**
 * @openapi
 * /api/v1/products:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Wireless Keyboard"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 49.99
 *               stock:
 *                 type: integer
 *                 default: 0
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', productController.create);
```

---

## 5. DELETE y respuesta 204

Una respuesta `204 No Content` no tiene cuerpo, por lo que no necesita `content`:

```typescript
/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', authMiddleware, productController.remove);
```

---

## 6. Usar $ref para reutilizar schemas

En lugar de definir el schema inline en cada operación, referencia el schema
del bloque `components` que definiste en `swagger.ts`:

```typescript
/**
 * @openapi
 * /api/v1/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
```

La ventaja: si el schema `Product` cambia, basta actualizar un solo lugar.

---

## 7. Tabla de tipos de datos comunes

| TypeScript | OpenAPI type | format |
|------------|--------------|--------|
| `string` | `string` | — |
| `number` (float) | `number` | `float` |
| `number` (int) | `integer` | `int32` |
| `boolean` | `boolean` | — |
| `Date` | `string` | `date-time` |
| `string[]` | `array` con `items: {type: string}` | — |

---

## ✅ Checklist de verificación

- [ ] Los bloques `@openapi` tienen indentación consistente (2 espacios)
- [ ] Los parámetros de ruta (`{id}`) están documentados con `in: path, required: true`
- [ ] Los query params tienen `schema.default` cuando aplica
- [ ] Las respuestas `204` no tienen `content`
- [ ] Estoy usando `$ref` para schemas repetidos en lugar de copiar YAML
