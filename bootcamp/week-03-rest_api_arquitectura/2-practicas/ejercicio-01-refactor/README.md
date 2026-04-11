# Ejercicio 01 — Refactor en Capas

## 🎯 Objetivo

Tomar una aplicación Express "plana" (todo en un archivo) y refactorizarla con la arquitectura de 4 capas: `routes → controllers → services → repositories`.

Aprenderás a:
- Identificar qué código pertenece a cada capa
- Mover la lógica al lugar correcto
- Mantener las mismas funcionalidades pero con código mantenible

---

## 📋 Estructura del ejercicio

```
ejercicio-01-refactor/
└── starter/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── app.ts               # Ya configurado — no modificar
        ├── server.ts            # Ya configurado — no modificar
        ├── types.ts             # Interfaces listas — revisar
        ├── app-flat.ts          # ⚠️ Punto de partida: app sin capas
        ├── routes/
        │   └── products.routes.ts    # Paso 1
        ├── controllers/
        │   └── products.controller.ts # Paso 2
        ├── services/
        │   └── products.service.ts   # Paso 3
        └── repositories/
            └── products.repository.ts # Paso 4
```

---

## 📝 Pasos

### Paso 0: Observar la app plana

Abre `src/app-flat.ts`. Verás una app Express donde todo está en un solo módulo: rutas, lógica y datos mezclados. Esta es la forma que debes **transformar** a arquitectura en capas.

```ts
// Así se ve una app "plana" típica que vamos a refactorizar:
// router.get('/', (_req, res) => {
//   const data = products.slice(/* paginación mezclada aquí */);
//   res.json(data);
// });
```

---

### Paso 1: Repository — mover el acceso a datos

Abre `src/repositories/products.repository.ts` y descomenta el bloque del **Paso 1**.

El repository debe:
- Tener el array `products[]` como store
- Exportar `findAll`, `findById`, `create`, `update`, `remove` — todos `async`

Verifica que TypeScript compile: `pnpm build` sin errores.

---

### Paso 2: Service — mover la lógica de negocio

Abre `src/services/products.service.ts` y descomenta el bloque del **Paso 2**.

El service debe:
- Importar del repository (no del store directamente)
- Implementar la paginación en `findAll`
- Verificar existencia antes de actualizar/eliminar

El service **NO debe** importar nada de Express.

---

### Paso 3: Controller — solo interfaz HTTP

Abre `src/controllers/products.controller.ts` y descomenta el bloque del **Paso 3**.

El controller debe:
- Extraer `req.params.id`, `req.query.page`, `req.body`
- Llamar al service con esos datos
- Responder con `res.json({ data: ... })` o el status correcto

El controller **NO debe** tener lógica de negocio ni acceder al store.

---

### Paso 4: Routes — solo mapeo

Abre `src/routes/products.routes.ts` y descomenta el bloque del **Paso 4**.

Las rutas deben:
- Importar del controller
- Mapear `GET /` → `controller.getAll`, `POST /` → `controller.create`, etc.

---

## ✅ Criterios de verificación

- [ ] El servidor arranca sin errores con `pnpm dev`
- [ ] `GET /api/v1/products?page=1&limit=5` retorna `{ data: [...], total, page, limit }`
- [ ] `GET /api/v1/products/999` retorna `{ error, message }` con 404
- [ ] `POST /api/v1/products` crea y retorna el producto con 201
- [ ] El archivo `products.service.ts` no importa nada de Express
- [ ] El archivo `products.repository.ts` no tiene imports de Express ni de services
- [ ] TypeScript compila sin errores (`pnpm build`)
