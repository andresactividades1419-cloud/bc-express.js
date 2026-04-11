# Tests Unitarios con Jest

## 🎯 Objetivos

- Entender el concepto de test unitario y por qué se aíslan dependencias
- Usar `jest.fn()` para crear funciones mock
- Usar `jest.mock()` para reemplazar módulos completos
- Testear la capa de servicios con repositorios simulados

![Pirámide de Tests](../0-assets/01-test-pyramid.svg)

## 1. ¿Qué es un Test Unitario?

Un test unitario verifica una **unidad de código en aislamiento** — sin base de datos, sin red, sin sistema de archivos. En arquitectura en capas, la unidad natural a testear es el **servicio**:

```
routes → controllers → [SERVICES] ← testear aquí
                             ↓
                       repositories  ← mockear esto
```

El service contiene la lógica de negocio. Al mockear el repository, el test verifica solo esa lógica, no la conexión a MongoDB.

## 2. `jest.fn()` — Función Mock Manual

```ts
// Una función mock registra sus llamadas
const mockFindByEmail = jest.fn();

// Definir qué retorna cuando se llama
mockFindByEmail.mockResolvedValue(null); // async → null

// Llamarla
await mockFindByEmail('test@test.com');

// Verificar cómo fue llamada
expect(mockFindByEmail).toHaveBeenCalledTimes(1);
expect(mockFindByEmail).toHaveBeenCalledWith('test@test.com');
expect(mockFindByEmail).toHaveReturnedWith(/* promise resolving null */);
```

## 3. `jest.mock()` — Mockear Módulos Completos

La forma más limpia de aislar servicios es mockear el módulo de repository completo:

```ts
// auth.service.test.ts

// IMPORTANTE: jest.mock() debe ir ANTES de los imports que lo usan
// Jest lo hoista automáticamente al inicio del archivo
jest.mock('../repositories/users.repository');

import * as usersRepo from '../repositories/users.repository';
import * as authService from '../services/auth.service';
import { AppError } from '../errors/AppError';

// Cast para que TypeScript reconozca los métodos mock
const mockFindByEmail = usersRepo.findUserByEmail as jest.MockedFunction<
  typeof usersRepo.findUserByEmail
>;
const mockCreateUser = usersRepo.createUser as jest.MockedFunction<
  typeof usersRepo.createUser
>;
```

## 4. Testear `auth.service.register()`

```ts
describe('authService.register', () => {
  afterEach(() => {
    jest.clearAllMocks(); // limpiar calls entre tests
  });

  it('should create a user when email is not taken', async () => {
    // Arrange
    const dto = { name: 'Alice', email: 'alice@test.com', password: 'Password1' };
    mockFindByEmail.mockResolvedValue(null); // email libre
    mockCreateUser.mockResolvedValue({
      _id: 'user-id-123',
      name: dto.name,
      email: dto.email,
      role: 'user',
    } as any);

    // Act
    const result = await authService.register(dto);

    // Assert
    expect(mockFindByEmail).toHaveBeenCalledWith(dto.email);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(result.email).toBe(dto.email);
    expect(result.role).toBe('user');
  });

  it('should throw AppError(409) when email is already taken', async () => {
    // Arrange — fingir que el email ya existe
    mockFindByEmail.mockResolvedValue({ email: 'alice@test.com' } as any);

    // Act & Assert
    await expect(
      authService.register({ name: 'Alice', email: 'alice@test.com', password: 'Password1' })
    ).rejects.toThrow(AppError);

    await expect(
      authService.register({ name: 'Alice', email: 'alice@test.com', password: 'Password1' })
    ).rejects.toThrow('Email already registered');
  });
});
```

## 5. Testear `auth.service.login()`

```ts
import bcrypt from 'bcrypt';

describe('authService.login', () => {
  it('should return tokens when credentials are valid', async () => {
    // Arrange
    const hashedPassword = await bcrypt.hash('Password1', 1); // rounds=1 para velocidad en tests
    mockFindByEmail.mockResolvedValue({
      _id: { toString: () => 'user-id-123' },
      email: 'alice@test.com',
      password: hashedPassword,
      role: 'user',
    } as any);
    mockUpdateRefreshToken.mockResolvedValue(undefined);

    // Act
    const result = await authService.login({
      email: 'alice@test.com',
      password: 'Password1',
    });

    // Assert
    expect(result.accessToken).toBeDefined();
    expect(typeof result.accessToken).toBe('string');
    expect(result.role).toBe('user');
  });

  it('should throw AppError(401) when password is wrong', async () => {
    mockFindByEmail.mockResolvedValue({
      _id: { toString: () => 'user-id-123' },
      email: 'alice@test.com',
      password: await bcrypt.hash('CorrectPassword1', 1),
      role: 'user',
    } as any);

    await expect(
      authService.login({ email: 'alice@test.com', password: 'WrongPassword1' })
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw AppError(401) when user does not exist', async () => {
    mockFindByEmail.mockResolvedValue(null);

    await expect(
      authService.login({ email: 'noone@test.com', password: 'Password1' })
    ).rejects.toThrow('Invalid credentials');
  });
});
```

## 6. `jest.spyOn()` — Mock Parcial

Cuando NO quieres reemplazar un módulo completo sino solo espiar una función:

```ts
import bcrypt from 'bcrypt';

// Espiar bcrypt.compare para verificar que se llama correctamente
const compareSpy = jest.spyOn(bcrypt, 'compare');
compareSpy.mockResolvedValue(true as never);

// Después del test, restaurar el original
afterEach(() => {
  compareSpy.mockRestore();
});
```

> Útil cuando quieres verificar que una función de una dependencia fue llamada con los argumentos correctos, sin modificar toda la librería.

## 7. Matchers para Funciones Mock

```ts
// Verificar llamadas
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith('arg1', expect.any(String));
expect(mockFn).toHaveBeenLastCalledWith('last-arg');

// Verificar que NO fue llamada
expect(mockFn).not.toHaveBeenCalled();

// Limpiar estado entre tests
jest.clearAllMocks();  // limpia calls y retornos
jest.resetAllMocks(); // también resetea implementaciones
jest.restoreAllMocks(); // restaura spies a su implementación original
```

## ✅ Checklist de Verificación

- [ ] `jest.mock()` colocado antes de los imports en el archivo de test
- [ ] `jest.clearAllMocks()` en `afterEach` para estado limpio
- [ ] Tests para camino feliz (happy path) y casos de error
- [ ] No se hace conexión real a base de datos en unit tests
- [ ] `mockResolvedValue` para funciones async, `mockReturnValue` para sync
