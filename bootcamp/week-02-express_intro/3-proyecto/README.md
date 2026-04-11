# Proyecto Semana 02 — Servidor Express con CRUD completo

## 🎯 Objetivo

Aplicar todo lo aprendido en la semana 02 para construir una API REST con Express 5 y TypeScript sobre tu **dominio asignado**: gestión de recursos con operaciones CRUD, middlewares personalizados y manejo correcto de códigos HTTP.

---

## 📋 Tu Dominio Asignado

> **Dominio**: _El instructor te asignará tu dominio al inicio del bootcamp._

Cada aprendiz trabaja sobre un dominio diferente para garantizar implementaciones originales. Ejemplos de adaptación:

| Dominio | Recurso principal | Campos típicos |
|---------|-------------------|----------------|
| Biblioteca | Libro | título, autor, ISBN, año |
| Farmacia | Medicamento | nombre, precio, stock, categoría |
| Gimnasio | Miembro | nombre, plan, fechaVencimiento |
| Restaurante | Platillo | nombre, precio, categoría, disponible |
| Hotel | Habitación | número, tipo, precio, disponible |

Adapta los nombres y campos a **tu dominio específico**.

---

## 🗂️ Estructura del proyecto

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts           # Configurar Express: middlewares + rutas
    ├── server.ts        # Entry point: arrancar servidor
    ├── types.ts         # Interfaz del recurso principal
    ├── store.ts         # Store en memoria con operaciones CRUD
    └── routes/
        └── items.routes.ts  # 5 endpoints CRUD
```

---

## ✅ Requisitos funcionales

### 1. Endpoints requeridos

| Método | Ruta | Descripción | Status code |
|--------|------|-------------|-------------|
| GET | `/api/v1/items` | Listar todos los recursos | 200 |
| GET | `/api/v1/items/:id` | Obtener un recurso por ID | 200 / 404 |
| POST | `/api/v1/items` | Crear un nuevo recurso | 201 |
| PUT | `/api/v1/items/:id` | Actualizar un recurso completo | 200 / 404 |
| DELETE | `/api/v1/items/:id` | Eliminar un recurso | 204 / 404 |

> Reemplaza `items` por el nombre plural de tu recurso: `books`, `medications`, `members`, etc.

### 2. Middlewares requeridos

- **express.json()** — parseo de body
- **Logger personalizado** — registra método, URL, status y tiempo
- **Handler 404** — para rutas no encontradas
- **Error handler global** — 4 parámetros, siempre último

### 3. Store en memoria

El proyecto usa un array en memoria (sin base de datos). Implementar en `store.ts`:

- `getAll()` — retorna todos los ítems
- `getById(id)` — retorna un ítem o `undefined`
- `create(data)` — agrega y retorna el nuevo ítem
- `update(id, data)` — actualiza y retorna el ítem, o `undefined`
- `remove(id)` — elimina y retorna `boolean`

---

## 💡 Instrucciones de implementación

### Paso 1: Define tu interfaz en `types.ts`

```ts
// Adapta los campos a tu dominio:
export interface Item {
  id: number;
  // TODO: agregar campos específicos de tu dominio
  // Ejemplo biblioteca: title: string; author: string; isbn: string;
  // Ejemplo farmacia: name: string; price: number; stock: number;
}

export type CreateItemDto = Omit<Item, 'id'>;
```

### Paso 2: Implementa el store en `store.ts`

```ts
// TODO: Implementar las 5 operaciones CRUD
// Usa el array en memoria como base de datos temporal
```

### Paso 3: Implementa las rutas en `routes/items.routes.ts`

```ts
// TODO: Implementar los 5 endpoints usando el store
// Usar los status codes correctos: 200, 201, 204, 404
```

### Paso 4: Configura `app.ts` con los middlewares en orden

```ts
// TODO: Registrar middleware en el orden correcto
// 1. express.json()
// 2. logger
// 3. rutas
// 4. 404 handler
// 5. error handler
```

### Paso 5: Arranca en `server.ts`

```ts
// TODO: Implementar graceful shutdown (SIGTERM + SIGINT)
```

---

## 🧪 Pruebas con curl

Una vez implementado, verifica con los siguientes comandos (adapta el recurso a tu dominio):

```bash
# Listar
curl http://localhost:3000/api/v1/items

# Crear
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{ /* campos de tu dominio */ }'

# Obtener por ID
curl http://localhost:3000/api/v1/items/1

# Actualizar
curl -X PUT http://localhost:3000/api/v1/items/1 \
  -H "Content-Type: application/json" \
  -d '{ /* campos actualizados */ }'

# Eliminar
curl -X DELETE http://localhost:3000/api/v1/items/1
# Esperar: 204 sin body
```

---

## 📦 Entregables

1. **Código fuente** del proyecto adaptado a tu dominio
2. **Screenshots** de Postman o Thunder Client con las 5 operaciones funcionando
3. **README** describiendo tu dominio, el recurso implementado y decisiones de diseño

---

## 🔗 Criterios de evaluación

Ver [rubrica-evaluacion.md](../../rubrica-evaluacion.md) sección "Proyecto Semanal".
