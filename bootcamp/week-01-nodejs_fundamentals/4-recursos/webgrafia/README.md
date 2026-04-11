# 🌐 Webografía — Semana 01: Node.js Fundamentals

Documentación oficial, artículos y referencias web para la semana.

---

## 📖 Documentación Oficial

### Node.js
- **Node.js Docs v22** — https://nodejs.org/docs/latest/api/
  - [fs/promises](https://nodejs.org/docs/latest/api/fs.html#promises-api) — API de sistema de archivos con Promises
  - [path](https://nodejs.org/docs/latest/api/path.html) — Manipulación de rutas
  - [process](https://nodejs.org/docs/latest/api/process.html) — Objeto global del proceso
  - [Events](https://nodejs.org/docs/latest/api/events.html) — EventEmitter
  - [Modules: ECMAScript modules](https://nodejs.org/docs/latest/api/esm.html) — Guía completa de ESM en Node.js

### TypeScript
- **TypeScript Handbook** — https://www.typescriptlang.org/docs/handbook/intro.html
- **tsconfig Reference** — https://www.typescriptlang.org/tsconfig — Cada opción explicada
- **TypeScript Playground** — https://www.typescriptlang.org/play — Probar tipos en el navegador

---

## 📝 Artículos Esenciales

### Event Loop y Async

- **The Node.js Event Loop** (Node.js Docs oficial)
  https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
  > La guía oficial. Cubre todas las fases: timers, poll, check, nextTick.

- **Don't Block the Event Loop** (Node.js Docs)
  https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop
  > Guía crítica para producción. Explica qué operaciones son bloqueantes y cómo evitarlas.

- **Microtasks and Macrotasks** (javascript.info)
  https://javascript.info/event-loop
  > Explicación visual con diagramas del ciclo microtask/macrotask. Muy clara.

- **Understanding Promises in Node.js** (Node.js Docs)
  https://nodejs.org/en/learn/asynchronous-work/javascript-asynchronous-programming-and-callbacks

---

### ESM y CommonJS

- **ESM vs CommonJS: What's going on?** (Node.js Docs)
  https://nodejs.org/en/learn/getting-started/differences-between-nodejs-and-the-browser

- **Pure ESM Package** (sindresorhus)
  https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
  > Explica por qué el ecosistema está migrando a ESM y cómo adaptar código.

- **Node.js 22 Release Blog**
  https://nodejs.org/en/blog/release/v22.0.0
  > Novedades de Node.js 22 relevantes para el bootcamp (import.meta.dirname, etc.)

---

### TypeScript para Node.js

- **TypeScript with Node.js** (TypeScript Docs)
  https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html

- **NodeNext module resolution** (TypeScript Docs)
  https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext
  > Explica por qué necesitamos `.js` en los imports con NodeNext.

- **tsx — TypeScript execute** (GitHub)
  https://github.com/privatenumber/tsx
  > Documentación del runner que usamos en el bootcamp para ejecutar TypeScript directamente.

---

## 🛠️ Herramientas Interactivas

| Herramienta | URL | Uso |
|-------------|-----|-----|
| TypeScript Playground | https://www.typescriptlang.org/play | Probar tipos y código TS |
| Loupe (Event Loop visualizer) | http://latentflip.com/loupe | Visualizar el Call Stack y Event Loop en tiempo real |
| Node.js Release Schedule | https://nodejs.org/en/about/previous-releases | Ver versiones LTS activas |
| npmjs.com | https://www.npmjs.com | Buscar paquetes y versiones exactas |

---

## 🔍 Referencias Rápidas (Cheat Sheets)

- **TypeScript Cheat Sheets** (TypeScript Docs oficial)
  https://www.typescriptlang.org/cheatsheets/
  > 4 cheat sheets descargables: Types, Control Flow, Classes, Interfaces

- **Modern JavaScript Cheat Sheet**
  https://github.com/mbeaudru/modern-js-cheatsheet
  > Referencia de ES6+ con ejemplos concisos. Útil para async/await, destructuring, spread.

---

## 💬 Comunidad

- **Node.js Community** — https://github.com/nodejs/node/discussions
- **TypeScript Discord** — https://discord.com/invite/typescript
- **Stack Overflow: node.js tag** — https://stackoverflow.com/questions/tagged/node.js
