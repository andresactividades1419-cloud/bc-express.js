# Glosario — Semana 01: Node.js Fundamentals

Términos clave ordenados alfabéticamente.

---

## A

### async/await
Sintaxis de JavaScript (ES2017) para escribir código asíncrono de forma que parezca síncrono. `async` declara que una función retorna una `Promise`; `await` pausa la función actual hasta que la Promise se resuelva.

```ts
async function getData(): Promise<string> {
  const result = await readFile('file.txt', 'utf-8'); // espera sin bloquear
  return result;
}
```

---

## B

### Blocking I/O
Operación de entrada/salida que **bloquea** el hilo principal hasta completarse. Node.js evita esto con su modelo asíncrono no bloqueante.

---

## C

### Callback
Función que se pasa como argumento y se ejecuta cuando una operación asíncrona termina. Node.js usa el patrón **error-first callback**: `(err, result) => {}`.

### Call Stack
Estructura de datos (pila LIFO) que registra en qué punto de la ejecución se encuentra el programa. Cuando una función se llama, se apila; cuando retorna, se desapila.

### CommonJS (CJS)
Sistema de módulos histórico de Node.js. Usa `require()` y `module.exports`. Está siendo reemplazado por ESM.

```js
// CommonJS
const fs = require('fs');
module.exports = { myFunction };
```

---

## E

### ES Modules (ESM)
Sistema de módulos estándar de JavaScript (ES2015+). Usa `import` y `export`. Es el estándar moderno para Node.js con `"type": "module"` en `package.json`.

```ts
// ESM
import { readFile } from 'fs/promises';
export function myFunction() { ... }
```

### Event Loop
Mecanismo central de Node.js que permite la ejecución no bloqueante. Comprueba continuamente si hay tareas pendientes y las ejecuta en orden: síncrono → `process.nextTick` → microtareas → macrotareas.

### Event-Driven Architecture
Patrón donde el flujo del programa está determinado por eventos (clicks, peticiones HTTP, operaciones I/O). Node.js está construido sobre este paradigma con su módulo `EventEmitter`.

---

## I

### import.meta.dirname
Propiedad disponible en Node.js 22+ en módulos ESM. Equivalente a `__dirname` de CommonJS: retorna el directorio absoluto del archivo actual.

```ts
// ESM (Node.js 22+)
const dir = import.meta.dirname; // '/home/user/project/src'
```

### import.meta.url
URL del módulo actual en ESM. Necesario en versiones anteriores a Node.js 22 para obtener `__dirname`.

---

## L

### libuv
Librería C++ que Node.js usa internamente para manejar I/O asíncrono, temporizadores y el Event Loop. Permite que Node.js sea no bloqueante a pesar de ser single-threaded.

---

## M

### Microtask Queue
Cola donde se encolan los callbacks de Promises resueltas y `queueMicrotask()`. Se vacía **antes** de la Macrotask Queue en cada iteración del Event Loop.

### Module Resolution
Proceso por el cual Node.js encuentra el archivo de un `import`. Con `"moduleResolution": "NodeNext"`, los imports locales deben incluir la extensión `.js`.

---

## N

### Named Export
Exportación con nombre explícito que puede convivir con otras exportaciones en el mismo archivo.

```ts
export function add(a: number, b: number): number { return a + b; }
export const PI = 3.14159;
```

### Node.js
Entorno de ejecución de JavaScript del lado del servidor, construido sobre el motor V8 de Google Chrome. Usa un modelo de I/O no bloqueante y orientado a eventos.

### Non-blocking I/O
Modelo donde las operaciones de I/O (lectura de archivos, peticiones de red) se inician y el programa continúa ejecutando otro código. El resultado se procesa cuando la operación completa (callback, Promise).

---

## P

### package.json
Archivo de configuración del proyecto Node.js. Define nombre, versión, scripts, dependencias y el campo `"type"` (module para ESM).

### Promise
Objeto que representa la eventual compleción (o fallo) de una operación asíncrona. Puede estar en estado `pending`, `fulfilled` o `rejected`.

```ts
const promise: Promise<string> = readFile('file.txt', 'utf-8');
promise.then((data) => console.log(data)).catch((err) => console.error(err));
```

### Promise.all
Método que ejecuta múltiples Promises en paralelo y retorna cuando **todas** se resuelven o cuando **una** rechaza.

```ts
const [users, products] = await Promise.all([fetchUsers(), fetchProducts()]);
```

### Promise.allSettled
Como `Promise.all` pero espera a que **todas** terminen, independientemente de si resuelven o rechazan. Útil cuando quieres procesar todos los resultados aunque algunos fallen.

### process.argv
Array de Node.js que contiene los argumentos de la línea de comandos. `process.argv[0]` es `node`, `[1]` es el script, `[2...]` son los argumentos del usuario.

### process.env
Objeto de Node.js que expone las variables de entorno del sistema operativo. Usado para inyectar configuración (puertos, secretos) sin hardcodearlos en el código.

---

## R

### Runtime
Entorno de ejecución. El **runtime** de Node.js proporciona las APIs nativas (fs, http, path…) adicionales a las del motor V8 (que solo entiende JavaScript puro).

---

## S

### Single-threaded
Node.js ejecuta JavaScript en un solo hilo. No puede ejecutar dos instrucciones JavaScript simultáneamente, pero el I/O se delega a libuv que usa hilos del sistema operativo.

### Strict mode (TypeScript)
Conjunto de verificaciones estrictas de TypeScript activado con `"strict": true` en `tsconfig.json`. Incluye: `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, entre otros.

---

## T

### tsconfig.json
Archivo de configuración del compilador TypeScript. Define opciones como `target`, `module`, `strict`, `outDir`, etc.

### tsx
Herramienta de desarrollo que ejecuta archivos TypeScript directamente en Node.js sin compilar a JavaScript primero. Ideal para desarrollo (`tsx watch src/index.ts`).

---

## V

### V8
Motor de JavaScript de Google (usado en Chrome y Node.js). Compila JavaScript a código máquina nativo para máxima performance. Node.js extiende V8 con APIs del sistema operativo.
