# Ejercicio 01: Unit Tests con Jest y Mocks

## 🎯 Objetivo

Testear `auth.service.ts` en completo aislamiento, usando `jest.mock()` para reemplazar el repositorio de usuarios y `jest.fn()` para controlar el comportamiento de cada función mockeada.

> **No hay carpeta `solution/`**. El ejercicio se resuelve descomentando el código del starter paso a paso y verificando que los tests pasen.

---

## 📦 Stack del Ejercicio

| Paquete | Rol |
|---------|-----|
| `jest@29.7.0` | Test runner |
| `ts-jest@29.3.2` | Compilar TypeScript en Jest |
| `@types/jest@29.5.14` | Tipos TypeScript para `describe/it/expect` |
| `bcrypt@5.1.1` | Hashing de contraseñas (real en el service) |
| `jsonwebtoken@9.0.2` | JWT (mockeado en los tests) |

> **Supertest y mongodb-memory-server NO se instalan aquí** — son para el ejercicio 02 de integración.

---

## 🗂️ Estructura del Starter

```
starter/
├── package.json
├── tsconfig.json
├── jest.config.ts
├── .env.example
└── src/
    ├── errors/
    │   └── AppError.ts
    ├── types/
    │   └── index.ts
    ├── models/
    │   └── user.model.ts
    ├── utils/
    │   └── jwt.ts
    ├── repositories/
    │   └── users.repository.ts          ← será mockeado
    └── services/
    │   └── auth.service.ts              ← será testeado
    └── __tests__/
        └── auth.service.test.ts         ← TU TRABAJO
```

---

## 🔑 Concepto Clave: `app` vs `server`

En este ejercicio testeamos **servicios puro** — no necesitamos app ni servidor. El mock reemplaza la capa de repositorio:

```
Test → auth.service.ts → [MOCK] users.repository.ts
                              ↑
               jest.mock('../repositories/users.repository')
```

---

## 📝 Paso a Paso

### PASO 1: Configurar el mock del módulo `users.repository`

Abre `src/__tests__/auth.service.test.ts` y descomenta la sección **PASO 1**:

El mock debe:
- Reemplazar `findUserByEmail` con `jest.fn()`
- Reemplazar `createUser` con `jest.fn()`
- Castear las funciones a `jest.MockedFunction<typeof fn>` para que TypeScript coopere

```ts
// Ejemplo de cómo se ve el mock del módulo:
jest.mock('../repositories/users.repository');
import * as usersRepo from '../repositories/users.repository';

const mockFindByEmail = usersRepo.findUserByEmail as jest.MockedFunction<typeof usersRepo.findUserByEmail>;
const mockCreateUser  = usersRepo.createUser  as jest.MockedFunction<typeof usersRepo.createUser>;
```

**Verifica**: `pnpm test` — debe aparecer el test "mock setup" en verde.

---

### PASO 2: Testear `register()` — happy path

Descomenta la sección **PASO 2**. El test debe configurar los mocks y verificar que el servicio crea el usuario correctamente:

```ts
// Configurar mocks para el happy path:
// mockFindByEmail.mockResolvedValue(null);       // email no existe aún
// mockCreateUser.mockResolvedValue({...user...}); // DB devuelve el usuario creado
```

**Verifica**: `pnpm test` — todos los tests deben estar en verde.

---

### PASO 3: Testear `register()` — email duplicado

Descomenta la sección **PASO 3**. Cuando `findUserByEmail` devuelve un usuario existente, el servicio debe lanzar un `AppError` con status `409`:

```ts
// El mock simula que el email ya existe:
// mockFindByEmail.mockResolvedValue({ email: dto.email, ...userBase });
//
// El test verifica que el error sea 409:
// await expect(authService.register(dto)).rejects.toMatchObject({
//   statusCode: 409,
// });
```

**Verifica**: `pnpm test` — 3 tests en verde.

---

### PASO 4: Testear `login()` con credenciales incorrectas

Descomenta la sección **PASO 4**. Hay dos sub-casos:

1. **Usuario no encontrado** — `findUserByEmail` devuelve `null` → error 401
2. **Contraseña incorrecta** — `findUserByEmail` devuelve un usuario real, pero la contraseña no coincide → error 401

```ts
// Sub-caso: usuario no existe
// mockFindByEmail.mockResolvedValue(null);
// await expect(authService.login(dto)).rejects.toMatchObject({ statusCode: 401 });

// Sub-caso: contraseña incorrecta
// const realHash = await bcrypt.hash('OtraClave1!', 1); // rounds=1 para velocidad
// mockFindByEmail.mockResolvedValue({ password: realHash, ...userBase });
// await expect(authService.login(loginDto)).rejects.toMatchObject({ statusCode: 401 });
```

**Verifica**: `pnpm test` — 5 tests en verde.

---

### PASO 5 (Bonus): Verificar que los mocks se llamaron correctamente

Descomenta la sección **PASO 5**. Usa `toHaveBeenCalledWith` para verificar que las funciones mockeadas recibieron los argumentos correctos:

```ts
// En el test de register happy path:
// expect(mockFindByEmail).toHaveBeenCalledWith(dto.email);
// expect(mockCreateUser).toHaveBeenCalledTimes(1);
```

---

## ▶️ Comandos

```bash
cd starter
pnpm install
pnpm test              # ejecutar todos los tests una vez
pnpm test:watch        # modo watch — re-ejecuta al guardar cambios
pnpm test:coverage     # generar reporte de cobertura
```

El reporte de cobertura se genera en `coverage/index.html`.

---

## ✅ Criterios de Éxito

- [ ] Todos los tests en verde (`PASS`)
- [ ] `jest.mock()` usado para reemplazar el repositorio (no instanciar clase real)
- [ ] `mockResolvedValue()` y `mockRejectedValue()` usados correctamente
- [ ] Tests de error incluyen el status code esperado (401, 409)
- [ ] `clearAllMocks` o `mockReset()` entre tests (configurado en `beforeEach`)
- [ ] Cobertura de `auth.service.ts` ≥ 80%
