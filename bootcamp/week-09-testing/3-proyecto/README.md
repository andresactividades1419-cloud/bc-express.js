# 🧪 Proyecto Semana 09: Testing de API REST

## 🎯 Objetivo

Implementar una suite completa de tests para la API del dominio que te fue asignado. Al finalizar, tu API debe tener cobertura de tests ≥ 80% con Jest, incluyendo unit tests para servicios e integration tests para rutas HTTP.

---

## 📋 Tu Dominio Asignado

**Dominio**: [El instructor asignará tu dominio al inicio del bootcamp]

Aplica todos los conceptos de testing a tu dominio específico. Ejemplos de adaptación:

| Dominio | Recurso principal | Servicio a testear |
|---------|------------------|--------------------|
| 📖 Biblioteca | Libro | `book.service.ts` |
| 💊 Farmacia | Medicamento | `medicine.service.ts` |
| 🏋️ Gimnasio | Miembro | `member.service.ts` |
| 🍽️ Restaurante | Platillo | `dish.service.ts` |

---

## 🗂️ Estructura del Starter

```
starter/
├── package.json
├── tsconfig.json
├── jest.config.ts
├── .env.test
└── src/
    ├── config/env.ts
    ├── errors/AppError.ts
    ├── types/index.ts
    ├── models/
    │   ├── user.model.ts
    │   └── item.model.ts            ← Adaptar al dominio: "book", "medicine", etc.
    ├── utils/jwt.ts
    ├── repositories/
    │   ├── users.repository.ts
    │   └── items.repository.ts      ← Adaptar al dominio
    ├── services/
    │   ├── auth.service.ts
    │   └── items.service.ts         ← Adaptar al dominio — ESTE se testea (unit)
    ├── validators/
    │   ├── auth.schema.ts
    │   └── items.schema.ts          ← Adaptar al dominio
    ├── middlewares/
    │   ├── auth.middleware.ts
    │   └── error.middleware.ts
    ├── controllers/
    │   ├── auth.controller.ts
    │   └── items.controller.ts      ← Adaptar al dominio
    ├── routes/
    │   ├── auth.routes.ts
    │   └── items.routes.ts          ← Adaptar al dominio — ESTAS se testean (integration)
    ├── app.ts
    └── __tests__/
        ├── items.service.test.ts    ← Unit tests — TODO
        └── items.routes.test.ts     ← Integration tests — TODO
```

---

## 🛠️ Entregables

### 1. Unit Tests (`__tests__/items.service.test.ts`)

Testea el servicio del recurso de tu dominio en **aislamiento** (con mocks):

**Tests requeridos:**

- `getAll()` — retorna todos los items (happy path)
- `getAll()` — con filtros (si aplica al dominio)
- `getById()` — retorna el item por ID
- `getById()` — lanza AppError 404 si no existe
- `create()` — crea el item con datos válidos
- `create()` — lanza error si datos duplicados (si aplica)
- `update()` — actualiza el item
- `update()` — lanza AppError 404 si no existe
- `delete()` — elimina el item
- `delete()` — lanza AppError 404 si no existe

### 2. Integration Tests (`__tests__/items.routes.test.ts`)

Testea las rutas HTTP del recurso de tu dominio usando **Supertest + MongoDB Memory Server**:

**Tests requeridos:**

- `GET /api/v1/items` → 200 con array vacío inicialmente
- `POST /api/v1/items` → 201 con datos válidos (requiere auth)
- `POST /api/v1/items` → 422 con datos inválidos (Zod)
- `POST /api/v1/items` → 401 sin token
- `GET /api/v1/items/:id` → 200 con item existente
- `GET /api/v1/items/:id` → 404 con ID inexistente
- `PUT /api/v1/items/:id` → 200 con datos válidos
- `DELETE /api/v1/items/:id` → 204 o 200 al eliminar
- `DELETE /api/v1/items/:id` → 403 si no es admin

### 3. Auth Unit Tests (`__tests__/auth.service.test.ts`)

Reutiliza los tests del ejercicio 01 adaptados a tu proyecto.

---

## 📊 Criterios de Cobertura

```
Threshold configurado en jest.config.ts:
  statements : 80%
  branches   : 70%
  functions  : 80%
  lines      : 80%
```

`pnpm test:coverage` debe pasar sin errores. Si baja del umbral, el CI falla.

---

## 💡 Ejemplos de Adaptación por Dominio

### Biblioteca — `book.service.test.ts`

```ts
describe('BookService', () => {
  it('should create a book with valid ISBN', async () => {
    mockCreateBook.mockResolvedValue({ _id: 'id', title: 'Clean Code', isbn: '978-0132350884' });
    const book = await bookService.create({ title: 'Clean Code', isbn: '978-0132350884', authorId: 'author-1' });
    expect(book.isbn).toBe('978-0132350884');
  });

  it('should throw 409 if ISBN already exists', async () => {
    mockFindByIsbn.mockResolvedValue({ isbn: '978-0132350884' });
    await expect(bookService.create(dto)).rejects.toMatchObject({ statusCode: 409 });
  });
});
```

### Farmacia — `medicine.service.test.ts`

```ts
describe('MedicineService', () => {
  it('should throw 400 if stock goes negative on dispensing', async () => {
    mockFindById.mockResolvedValue({ stock: 5 });
    await expect(medicineService.dispense('med-id', 10)).rejects.toMatchObject({ statusCode: 400 });
  });
});
```

---

## ▶️ Comandos

```bash
cd starter
pnpm install
pnpm test              # ejecutar todos los tests
pnpm test:watch        # modo watch
pnpm test:coverage     # reporte de cobertura → coverage/index.html
```

---

## ✅ Rúbrica de Entrega

| Criterio | Puntos |
|----------|--------|
| Unit tests para `items.service.ts` (happy path + errors) | 25 pts |
| Integration tests para `items.routes.ts` con MongoDB Memory Server | 25 pts |
| Auth unit tests (`auth.service.test.ts`) | 15 pts |
| Cobertura ≥ 80% statements y lines | 15 pts |
| `clearMocks` o `afterEach` limpia estado entre tests | 10 pts |
| Tests adapatados al dominio asignado | 10 pts |
| **Total** | **100 pts** |

**Penalizaciones:**
- Tests que pasan sin hacer asserts reales: -15 pts
- Tests que modifican estado global sin limpiarlo: -10 pts
- No usar `jest.mock()` en unit tests (real DB en unit test): -20 pts
