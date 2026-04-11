# Ejercicio 01 — Hello Express: Servidor con rutas CRUD

## 🎯 Objetivo

Construir un servidor Express 5 con TypeScript que exponga rutas CRUD para un recurso genérico (`items`). Aprenderás a:

- Crear y configurar una aplicación Express con `app.ts` / `server.ts`
- Declarar rutas `GET`, `POST`, `PUT` y `DELETE`
- Leer `req.params`, `req.query` y `req.body`
- Retornar los códigos de estado HTTP correctos

---

## 📋 Estructura del ejercicio

```
ejercicio-01-hello-express/
└── starter/
    ├── package.json
    ├── tsconfig.json
    ├── .env.example
    └── src/
        ├── app.ts
        ├── server.ts
        └── routes/
            └── items.routes.ts
```

---

## 📝 Pasos

### Paso 1: Instalar dependencias y arrancar el servidor

Las dependencias ya están en `package.json`. Instálalas y arranca el servidor:

```bash
pnpm install
pnpm dev
```

Abre `src/server.ts` y descomenta el bloque del **Paso 1**.

Verifica que el servidor arranca en `http://localhost:3000`.  
Con `curl http://localhost:3000/health` deberías recibir `{"status":"ok"}`.

---

### Paso 2: Registrar el router de items en app.ts

Con el servidor arrancando, el siguiente paso es conectar el router.

Abre `src/app.ts` y descomenta el bloque del **Paso 2**.

Verifica: `curl http://localhost:3000/api/v1/items` debe devolver `[]`.

---

### Paso 3: Implementar GET y POST

Abre `src/routes/items.routes.ts` y descomenta los bloques del **Paso 3a** (GET /items) y del **Paso 3b** (POST /items):

```ts
// Ejemplo de lo que encontrarás:
// router.get('/', (_req, res) => {
//   res.json(items);
// });
//
// router.post('/', (req, res) => {
//   const newItem = { id: items.length + 1, name: req.body.name as string };
//   items.push(newItem);
//   res.status(201).json(newItem);
// });
```

Verifica:

```bash
# Listar (vacío al inicio)
curl http://localhost:3000/api/v1/items

# Crear
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{"name": "teclado"}'
# Respuesta esperada: 201 + { "id": 1, "name": "teclado" }
```

---

### Paso 4: Implementar GET by ID, PUT y DELETE

Descomenta los bloques **Paso 4a**, **Paso 4b** y **Paso 4c** en `items.routes.ts`:

- `GET /items/:id` → 200 con el item, 404 si no existe
- `PUT /items/:id` → 200 con el item actualizado, 404 si no existe
- `DELETE /items/:id` → 204 sin body, 404 si no existe

```bash
# Obtener por ID
curl http://localhost:3000/api/v1/items/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "mouse"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/items/1
# Respuesta: 204 sin body
```

---

## ✅ Criterios de verificación

- [ ] El servidor arranca sin errores con `pnpm dev`
- [ ] `GET /health` retorna `{ "status": "ok" }` con 200
- [ ] `GET /api/v1/items` retorna un array (inicial vacío)
- [ ] `POST /api/v1/items` crea un item y retorna 201
- [ ] `GET /api/v1/items/:id` retorna 404 si el ID no existe
- [ ] `DELETE /api/v1/items/:id` retorna 204 sin body
- [ ] TypeScript compila sin errores (`pnpm build`)
