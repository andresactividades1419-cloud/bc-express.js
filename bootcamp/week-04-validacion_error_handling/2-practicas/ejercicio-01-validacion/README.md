# Ejercicio 01 — Validación con Zod

## 🎯 Objetivo

Agregar validación de inputs con Zod a una API Express existente. Aprenderás a:
- Definir schemas Zod para DTOs de creación y actualización
- Usar `.safeParse()` para validar sin lanzar excepciones
- Generar respuestas 400 con los errores descriptivos de Zod
- Inferir tipos TypeScript directamente desde los schemas

---

## 📋 Estructura del ejercicio

```
ejercicio-01-validacion/
└── starter/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── app.ts            # Ya configurado
        ├── server.ts         # Ya configurado
        ├── types.ts          # Tipos base del dominio
        ├── schemas/
        │   └── product.schema.ts   # Paso 1: definir schemas
        ├── routes/
        │   └── products.routes.ts  # Ya listo
        ├── controllers/
        │   └── products.controller.ts  # Pasos 2, 3 y 4
        ├── services/
        │   └── products.service.ts     # Ya listo (semana 03)
        └── repositories/
            └── products.repository.ts  # Ya listo (semana 03)
```

---

## 📝 Pasos

### Paso 1: Definir los schemas Zod

Abre `src/schemas/product.schema.ts` y descomenta el bloque del **Paso 1**.

- `createProductSchema` debe requerir `name (min 1)`, `price (positivo)` y `stock (int >= 0, default 0)`
- `updateProductSchema` reutiliza el anterior con `.partial()`
- Los tipos `CreateProductDto` y `UpdateProductDto` se infieren con `z.infer<>`

---

### Paso 2: Validar POST /products

Abre `src/controllers/products.controller.ts` y descomenta el bloque del **Paso 2** en la función `create`.

El flujo debe ser:
1. `safeParse(req.body)`
2. Si `!result.success` → `res.status(400).json({ error, message, issues })`
3. Usar `result.data` como DTO tipado

---

### Paso 3: Validar PUT /products/:id

Descomenta el bloque del **Paso 3** en la función `update`.

Usa `updateProductSchema.safeParse(req.body)` — todos los campos son opcionales.

---

### Paso 4: Validar params `:id`

Descomenta el bloque del **Paso 4** en las funciones `getById`, `update` y `remove`.

Valida que el `id` sea un número entero positivo:
```ts
const idResult = z.coerce.number().int().positive().safeParse(req.params['id']);
```

---

## ✅ Criterios de verificación

- [ ] `POST /api/v1/products` sin `name` → 400 con `issues[0].field = 'name'`
- [ ] `POST /api/v1/products` con `price: -5` → 400 con mensaje descriptivo
- [ ] `POST /api/v1/products` con datos válidos → 201 con `{ data: product }`
- [ ] `PUT /api/v1/products/1` con solo `{ price: 99 }` → 200 (partial update)
- [ ] `GET /api/v1/products/abc` → 400 (id no numérico)
- [ ] Los tipos `CreateProductDto` y `UpdateProductDto` en el controller son `z.infer<>`
- [ ] `pnpm build` sin errores TypeScript
