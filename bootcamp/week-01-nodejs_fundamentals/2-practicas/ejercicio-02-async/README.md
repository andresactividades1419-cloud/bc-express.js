# Ejercicio 02 — Patrones Asíncronos Comparados

## 🎯 Objetivo

Implementar la misma operación (leer un archivo y procesar sus datos) usando los tres patrones asíncronos de Node.js: **callbacks**, **Promises** y **async/await**. Al final comprenderás por qué `async/await` es el estándar moderno.

## 📋 Prerrequisitos

- Ejercicio 01 completado
- [03-async-await.md](../../1-teoria/03-async-await.md) leído

## ⏱️ Tiempo estimado: 60 minutos

---

## Paso 1: Patrón con Callbacks (el pasado)

Los callbacks son funciones que se ejecutan cuando una operación asíncrona termina. Node.js los usó históricamente en todos sus módulos.

**Abre `starter/src/01-callbacks.ts`** y descomenta la sección del Paso 1:

```ts
import { readFile } from 'fs';
import { join } from 'path';

// El callback sigue el patrón Node.js: primer argumento es error, segundo es resultado.
// Este patrón se llama "error-first callback" o "Node.js callback convention".
function loadUsersWithCallback(callback: (error: Error | null, users?: User[]) => void): void {
  const filePath = join(import.meta.dirname, '..', 'data', 'users.json');

  readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      // Si hay error, lo pasamos como primer argumento
      callback(new Error(`Could not read file: ${err.message}`));
      return;
    }
    try {
      const users = JSON.parse(data) as User[];
      callback(null, users); // null = sin error, users = resultado
    } catch {
      callback(new Error('Invalid JSON format'));
    }
  });
}
```

Ejecuta el Paso 1 en `pnpm dev` y verifica que la consola muestra los usuarios.

---

## Paso 2: Patrón con Promises

Las Promises envuelven operaciones asíncronas y permiten encadenar `.then()` y `.catch()`.

**Abre `starter/src/02-promises.ts`** y descomenta la sección del Paso 2:

```ts
import { readFile } from 'fs/promises';
import { join } from 'path';

// readFile de 'fs/promises' ya retorna una Promise — no necesitamos envolver nada
function loadUsersWithPromise(): Promise<User[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'users.json');

  // Las Promises se encadenan con .then() para transformar el resultado
  return readFile(filePath, 'utf-8')
    .then((raw) => JSON.parse(raw) as User[])
    .catch((err: unknown) => {
      throw new Error(`Failed to load users: ${err instanceof Error ? err.message : err}`);
    });
}
```

Verifica que produce el mismo resultado que el Paso 1.

---

## Paso 3: Patrón con async/await (el estándar)

`async/await` hace que el código asíncrono parezca síncrono — más legible y mantenible.

**Abre `starter/src/03-async-await.ts`** y descomenta la sección del Paso 3:

```ts
import { readFile } from 'fs/promises';
import { join } from 'path';

// async/await: la misma lógica que Promise, pero infinitamente más legible
async function loadUsersWithAsync(): Promise<User[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'users.json');

  try {
    // await pausa esta función (no el Event Loop) hasta que readFile complete
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as User[];
  } catch (err) {
    throw new Error(`Failed to load users: ${err instanceof Error ? err.message : err}`);
  }
}
```

---

## Paso 4: Comparar los tres patrones

**Abre `starter/src/index.ts`** y descomenta la sección del Paso 4:

```ts
// El objetivo: los tres deberían mostrar el mismo resultado

// 1. Con callbacks (más verboso)
loadUsersWithCallback((err, users) => {
  if (err) { console.error('Callback error:', err.message); return; }
  console.log('Callbacks:', users?.length, 'users loaded');
});

// 2. Con Promises (encadenado)
loadUsersWithPromise()
  .then((users) => console.log('Promises:', users.length, 'users loaded'))
  .catch((err: Error) => console.error('Promise error:', err.message));

// 3. Con async/await (más legible — el estándar que usaremos)
const runAsync = async (): Promise<void> => {
  try {
    const users = await loadUsersWithAsync();
    console.log('Async/Await:', users.length, 'users loaded');
  } catch (err) {
    console.error('Async error:', err instanceof Error ? err.message : err);
  }
};

runAsync();
```

---

## Paso 5: Operaciones paralelas con Promise.all

**Abre `starter/src/04-parallel.ts`** y descomenta la sección del Paso 5:

```ts
// Cargar dos archivos AL MISMO TIEMPO con Promise.all
async function loadAllData(): Promise<void> {
  console.time('parallel');

  // Ambas lecturas se inician simultáneamente — no esperamos una para empezar la otra
  const [users, products] = await Promise.all([
    loadUsersWithAsync(),
    loadProductsWithAsync(),
  ]);

  console.timeEnd('parallel');
  console.log(`Loaded ${users.length} users and ${products.length} products in parallel`);
}
```

Compara el tiempo con cargarlos secuencialmente.

---

## ✅ Verificación Final

1. Los tres patrones (callback, promise, async/await) producen el mismo resultado
2. `Promise.all` carga los dos archivos más rápido que secuencial
3. El manejo de errores funciona en los tres patrones (prueba con un nombre de archivo incorrecto)
4. `pnpm build` compila sin errores

## 🔑 Conclusión

| Patrón | Legibilidad | Manejo de errores | Uso en este bootcamp |
|--------|:-----------:|:-----------------:|:--------------------:|
| Callbacks | ❌ Bajo | Confuso | Solo al leer APIs legacy |
| Promises | ⚠️ Medio | `.catch()` | Cuando se encadenan muchos `.then()` |
| async/await | ✅ Alto | `try/catch` | **Siempre** |
