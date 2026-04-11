# Ejercicio 02: Integration Tests con Supertest

## 🎯 Objetivo

Testear los endpoints HTTP de autenticación con Supertest, verificando el ciclo completo: HTTP request → middleware → controller → service → MongoDB (en memoria). Sin mocks de la capa de servicio.

> **No hay carpeta `solution/`**. El ejercicio se resuelve descomentando el código del starter paso a paso y verificando que los tests pasen.

---

## 📦 Stack del Ejercicio

| Paquete | Rol |
|---------|-----|
| `jest@29.7.0` | Test runner |
| `ts-jest@29.3.2` | TypeScript en Jest |
| `supertest@7.1.0` | Requests HTTP sin servidor real |
| `@types/supertest@6.0.3` | Tipos TypeScript para Supertest |
| `mongodb-memory-server@10.1.4` | MongoDB en RAM para tests |
| `mongoose@8.14.2` | ODM + conectar al memory server |

> El stack completo de la app (express, bcrypt, jwt, helmet, zod…) está incluido.

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
    ├── models/user.model.ts
    ├── utils/jwt.ts
    ├── repositories/users.repository.ts
    ├── services/auth.service.ts
    ├── validators/auth.schema.ts
    ├── middlewares/
    │   ├── auth.middleware.ts
    │   └── error.middleware.ts
    ├── controllers/auth.controller.ts
    ├── routes/auth.routes.ts
    ├── app.ts                           ← exporta {app} sin listen()
    └── __tests__/
        └── auth.integration.test.ts    ← TU TRABAJO
```

---

## 🔑 Concepto Clave: `app` vs `server`

```
                       ┌─────────────────────────────────┐
                       │          app.ts                 │
                       │  export const app = express()   │  ← importar esto
                       │  app.use('/api/v1', router)     │
                       └─────────────────────────────────┘
                                        ↑
Supertest importa app y crea su propio servidor TCP temporal.
NUNCA debes llamar app.listen() dentro de los tests.
                                        
                       ┌─────────────────────────────────┐
                       │          server.ts              │
                       │  app.listen(3000)               │  ← NO importar en tests
                       └─────────────────────────────────┘
```

---

## 📝 Paso a Paso

### PASO 1: Configurar `mongodb-memory-server` en los hooks

Abre `src/__tests__/auth.integration.test.ts` y descomenta la sección **PASO 1**:

```ts
// Se necesita una instancia de MongoMemoryServer por suite
// let mongod: MongoMemoryServer;
//
// beforeAll(async () => {
//   mongod = await MongoMemoryServer.create();
//   await mongoose.connect(mongod.getUri());
// });
//
// afterEach(async () => {
//   // Limpiar todos los documentos entre tests (estado limpio)
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
// });
//
// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongod.stop();
// });
```

**Verifica**: `pnpm test` — Jest debe conectar y desconectar sin errores.

---

### PASO 2: Testear `POST /api/v1/auth/register` → 201

Descomenta la sección **PASO 2**:

```ts
// it('should return 201 and user data on valid registration', async () => {
//   const res = await request(app)
//     .post('/api/v1/auth/register')
//     .send({ name: 'Alice', email: 'alice@test.com', password: 'Password1!' });
//
//   expect(res.status).toBe(201);
//   expect(res.body.data).toMatchObject({
//     email: 'alice@test.com',
//     role: 'user',
//   });
//   expect(res.body.data.password).toBeUndefined();
// });
```

**Verifica**: `pnpm test` — 1 test en verde.

---

### PASO 3: Testear `POST /api/v1/auth/register` → 409 (duplicado)

Descomenta la sección **PASO 3**:

```ts
// it('should return 409 when email is already registered', async () => {
//   // Registrar el primer usuario
//   await request(app)
//     .post('/api/v1/auth/register')
//     .send({ name: 'Alice', email: 'alice@test.com', password: 'Password1!' });
//
//   // Intentar registrar con el mismo email
//   const res = await request(app)
//     .post('/api/v1/auth/register')
//     .send({ name: 'Alice 2', email: 'alice@test.com', password: 'Password1!' });
//
//   expect(res.status).toBe(409);
// });
```

**Verifica**: `pnpm test` — 2 tests en verde.

---

### PASO 4: Testear login → usar token en `/me`

Descomenta la sección **PASO 4**. Este paso encadena dos requests:

1. Register → Login → obtener token
2. Usar el token en `GET /api/v1/auth/me`

```ts
// describe('POST /api/v1/auth/login', () => {
//   beforeEach(async () => {
//     await request(app)
//       .post('/api/v1/auth/register')
//       .send({ name: 'Alice', email: 'alice@test.com', password: 'Password1!' });
//   });
//
//   it('should return 200 and accessToken on valid credentials', async () => {
//     const res = await request(app)
//       .post('/api/v1/auth/login')
//       .send({ email: 'alice@test.com', password: 'Password1!' });
//
//     expect(res.status).toBe(200);
//     expect(res.body.accessToken).toBeDefined();
//   });
//
//   it('should use the token to access GET /auth/me', async () => {
//     const loginRes = await request(app)
//       .post('/api/v1/auth/login')
//       .send({ email: 'alice@test.com', password: 'Password1!' });
//
//     const token = loginRes.body.accessToken as string;
//
//     const meRes = await request(app)
//       .get('/api/v1/auth/me')
//       .set('Authorization', `Bearer ${token}`);
//
//     expect(meRes.status).toBe(200);
//     expect(meRes.body.data.email).toBe('alice@test.com');
//   });
// });
```

**Verifica**: `pnpm test` — todos los tests en verde.

---

## ▶️ Comandos

```bash
cd starter
pnpm install
pnpm test              # ejecutar tests una vez
pnpm test:watch        # modo watch
pnpm test:coverage     # reporte de cobertura
```

---

## ✅ Criterios de Éxito

- [ ] `mongodb-memory-server` conectado en `beforeAll`, desconectado en `afterAll`
- [ ] `afterEach` limpia la base de datos (independencia entre tests)
- [ ] `request(app)` importa `app`, no `server`
- [ ] Tests cubren: 201, 409, 401, 200 con token
- [ ] `res.body.data.password` es `undefined` en respuestas de registro
- [ ] El header `Authorization: Bearer <token>` funciona en `/me`
