# Jest: Configuración y Primeros Tests

## 🎯 Objetivos

- Instalar y configurar Jest con TypeScript en un proyecto Express
- Entender la estructura `describe / it / expect`
- Usar matchers fundamentales de Jest
- Manejar el ciclo de vida de tests con hooks

## ¿Por qué los Tests Importan?

Los tests automatizan la verificación de que el código funciona como se espera. En el contexto de APIs REST, los tests permiten:

- **Detectar bugs temprano** — antes de que lleguen a producción
- **Refactorizar con confianza** — si los tests pasan, el comportamiento no cambió
- **Documentar el contrato** — un test bien escrito describe exactamente qué hace una función
- **Prevenir regresiones** — un bug corregido puede testearse para que no vuelva

## 1. Instalación

```bash
pnpm add -D jest@29.7.0 ts-jest@29.3.2 @types/jest@29.5.14
```

| Paquete | Rol |
|---------|-----|
| `jest` | Test runner y assertion library |
| `ts-jest` | Transforma TypeScript para Jest sin compilar a JS primero |
| `@types/jest` | Tipos para `describe`, `it`, `expect`, etc. |

## 2. Configuración: `jest.config.ts`

```ts
// jest.config.ts — en la raíz del proyecto
import type { Config } from 'jest';

const config: Config = {
  // ts-jest transforma archivos .ts antes de ejecutarlos
  preset: 'ts-jest',

  // Node.js como entorno de ejecución (no browser)
  testEnvironment: 'node',

  // Patrón para encontrar archivos de test
  testMatch: ['**/__tests__/**/*.test.ts', '**/*.spec.ts'],

  // Archivos de setup que corren antes de todos los tests
  // setupFilesAfterFramework: ['<rootDir>/src/__tests__/setup.ts'],

  // Excluir node_modules y dist del escaneo
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',          // entry point — no testear
    '!src/types/**',           // solo declaraciones
    '!src/**/*.d.ts',
  ],

  // Umbrales de cobertura mínima (falla si no se alcanza)
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80,
    },
  },
};

export default config;
```

## 3. Scripts en `package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 4. Estructura de Tests: `describe / it / expect`

El patrón AAA (Arrange, Act, Assert) organiza cada test en tres partes:

```ts
// src/__tests__/math.test.ts
describe('add function', () => {
  it('should return the sum of two numbers', () => {
    // Arrange — preparar datos
    const a = 2;
    const b = 3;

    // Act — ejecutar la función
    const result = a + b;

    // Assert — verificar el resultado
    expect(result).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(-1 + -2).toBe(-3);
  });
});
```

## 5. Matchers Fundamentales

```ts
// Igualdad
expect(value).toBe(5);          // === (primitivos)
expect(obj).toEqual({ a: 1 });  // deep equality (objetos)

// Verdadero / falso
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Números
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);

// Strings
expect(str).toContain('hello');
expect(str).toMatch(/^hello/);

// Arrays
expect(arr).toHaveLength(3);
expect(arr).toContain('item');

// Errores
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('mensaje de error');
await expect(asyncFn()).rejects.toThrow('error message');

// Objetos
expect(obj).toHaveProperty('key');
expect(obj).toMatchObject({ name: 'Alice' }); // subset match
```

## 6. Tests Asíncronos

Las APIs Express son completamente asíncronas. Jest soporta `async/await`:

```ts
describe('UserService', () => {
  it('should fetch user by id', async () => {
    // async/await funciona directamente con it()
    const user = await userService.findById('123');
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@test.com');
  });

  it('should throw when user not found', async () => {
    // Para errores async: rejects.toThrow()
    await expect(userService.findById('invalid')).rejects.toThrow('User not found');
  });
});
```

## 7. Hooks de Ciclo de Vida

```ts
describe('DatabaseTests', () => {
  // Corre UNA VEZ antes de todos los tests del describe
  beforeAll(async () => {
    await connectDB();
  });

  // Corre UNA VEZ después de todos los tests del describe
  afterAll(async () => {
    await disconnectDB();
  });

  // Corre ANTES de CADA test individual
  beforeEach(async () => {
    await clearDatabase(); // estado limpio antes de cada test
  });

  // Corre DESPUÉS de CADA test individual
  afterEach(() => {
    jest.clearAllMocks(); // limpiar mocks después de cada test
  });

  it('test 1', () => { /* ... */ });
  it('test 2', () => { /* ... */ });
});
```

| Hook | Cuándo corre | Uso típico |
|------|-------------|-----------|
| `beforeAll` | Una vez, al inicio del bloque | Conectar DB, levantar servidor |
| `afterAll` | Una vez, al final del bloque | Desconectar DB, cerrar servidor |
| `beforeEach` | Antes de cada `it` | Reset de datos, limpiar estado |
| `afterEach` | Después de cada `it` | `jest.clearAllMocks()` |

## ✅ Checklist de Verificación

- [ ] `pnpm test` corre sin errores
- [ ] `jest.config.ts` en la raíz con `preset: 'ts-jest'`
- [ ] `testEnvironment: 'node'` configurado
- [ ] Scripts `test`, `test:watch` y `test:coverage` en `package.json`
- [ ] Entiendo la diferencia entre `toBe` y `toEqual`
- [ ] Sé cómo testear funciones que lanzan errores
