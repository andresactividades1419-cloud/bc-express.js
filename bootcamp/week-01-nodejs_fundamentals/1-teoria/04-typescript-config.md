# TypeScript para Backend: Configuración

## 🎯 Objetivos

Al finalizar este archivo, comprenderás:

- Por qué TypeScript es esencial para APIs backend en producción
- Cómo configurar `tsconfig.json` con `strict: true` para Node.js
- Qué hace cada opción clave del `tsconfig.json`
- Cómo instalar `@types/node` y usarlo en el código
- El flujo de desarrollo: editar `.ts` → ejecutar con `tsx` → compilar con `tsc`

## 📋 ¿Por qué TypeScript en Backend?

> 💡 **Diferencia con el frontend**: En el frontend, TypeScript atrapa errores en tiempo de desarrollo. En el backend, además detecta bugs que en producción costarían downtime y pérdida de datos.

```ts
// ❌ Sin TypeScript — el bug se descubre en producción
async function getUser(id) {
  const user = await db.find(id);
  return user.emal; // typo: debería ser `email` — falla en runtime
}

// ✅ Con TypeScript — el bug se detecta al escribir el código
async function getUser(id: string): Promise<User> {
  const user = await db.find(id);
  return user.emal; // Error: Property 'emal' does not exist on type 'User'
}
```

## 📋 tsconfig.json para Node.js 22

```json
{
  "compilerOptions": {
    // ── Target y módulos ──────────────────────────────────────
    "target": "ES2022",           // Compila a ES2022 (Node.js 22 lo soporta nativamente)
    "module": "NodeNext",         // Sistema de módulos: ESM con resolución de Node.js
    "moduleResolution": "NodeNext", // Cómo resuelve imports: requiere .js al final

    // ── Entradas y salidas ────────────────────────────────────
    "rootDir": "./src",           // Carpeta fuente de TypeScript
    "outDir": "./dist",           // Carpeta de salida JavaScript compilado

    // ── Strict mode (obligatorio en este bootcamp) ────────────
    "strict": true,               // Activa TODOS los checks estrictos:
    //   - noImplicitAny          No permite variables sin tipo inferible
    //   - strictNullChecks       null y undefined no son asignables por defecto
    //   - strictFunctionTypes    Tipos de parámetros en callbacks más seguros
    //   - strictPropertyInitialization  Propiedades de clase deben inicializarse

    // ── Calidad de código ─────────────────────────────────────
    "noUnusedLocals": true,       // Error si hay variables locales no usadas
    "noUnusedParameters": true,   // Error si hay parámetros de función no usados
    "noImplicitReturns": true,    // Error si no todos los paths de if/else retornan

    // ── Interoperabilidad ─────────────────────────────────────
    "esModuleInterop": true,      // Permite: import express from 'express' (sin * as)
    "skipLibCheck": true,         // Omite chequeo de .d.ts de node_modules (más rápido)
    "forceConsistentCasingInFileNames": true // Evita bugs en sistemas case-insensitive (Windows)
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

## 📋 Tipos para Node.js: `@types/node`

Node.js no incluye tipos TypeScript por defecto. Se instalan con:

```bash
pnpm add -D @types/node@22.15.21
```

Esto provee tipos para todos los built-ins:

```ts
// Sin @types/node: error "Cannot find name 'process'"
// Con @types/node: tipado completo

import { readFile } from 'fs/promises';  // Buffer, FileHandle, etc.
import { join } from 'path';             // string return types
import { createServer } from 'http';     // IncomingMessage, ServerResponse
import type { Buffer } from 'buffer';    // Buffer type

// process está disponible globalmente (sin import)
const port: number = parseInt(process.env.PORT ?? '3000', 10);
const isDev: boolean = process.env.NODE_ENV === 'development';
```

## 📋 Interfaces y Types para Backend

```ts
// interfaces para estructuras de dominio (DTOs, entidades)
interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// type para uniones y alias simples
type UserRole = 'admin' | 'user' | 'moderator';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Generics para funciones reutilizables
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

async function paginate<T>(
  query: () => Promise<T[]>,
  page: number,
  limit: number
): Promise<PaginatedResponse<T>> {
  const data = await query();
  return { data, total: data.length, page, limit };
}
```

## 📋 Flujo de Desarrollo

```bash
# ── Desarrollo (hot-reload con tsx) ──────────────────────────
pnpm dev          # ejecuta: tsx watch src/index.ts
# tsx transpila TypeScript on-the-fly sin compilar a disco
# watch recarga automáticamente al guardar cambios

# ── Verificación de tipos (sin compilar) ─────────────────────
pnpm typecheck    # ejecuta: tsc --noEmit
# Verifica tipos sin generar archivos dist/

# ── Producción (compilar a JavaScript) ───────────────────────
pnpm build        # ejecuta: tsc
# Genera dist/ con JavaScript puro para desplegar

pnpm start        # ejecuta: node dist/index.js
```

## ⚠️ Errores Comunes

- **`error TS2307: Cannot find module './utils'`**: con `NodeNext`, los imports locales necesitan extensión `.js` aunque el archivo sea `.ts`
- **`noImplicitAny` bloqueando`**: TypeScript no puede inferir el tipo — añadir anotación explícita o usar un tipo genérico
- **`strictNullChecks` con Prisma**: `findUnique` puede retornar `null` — siempre verificar antes de acceder a propiedades
- **`noUnusedParameters`**: si un parámetro es requerido por la firma pero no se usa, prefijar con `_`: `_req: Request`

## 📚 Recursos Adicionales

- [TypeScript — tsconfig reference](https://www.typescriptlang.org/tsconfig)
- [TypeScript — Handbook: Types for the Node.js runtime](https://www.typescriptlang.org/docs/handbook/intro.html)
- [tsx — TypeScript execute](https://tsx.is/)

## ✅ Checklist de Verificación

- [ ] Crear un `tsconfig.json` con `strict: true` y `module: "NodeNext"` sin copiar y pegar
- [ ] Instalar `@types/node` y acceder a `process.env` sin errores de tipo
- [ ] Definir una `interface` para un DTO y usarla en una función tipada
- [ ] Ejecutar el proyecto con `tsx watch` y verificar que recarga al guardar
- [ ] Compilar con `tsc` y verificar que `dist/` contiene JavaScript válido
