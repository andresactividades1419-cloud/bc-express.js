// ============================================
// PASO 3 — Patrón con async/await (el estándar)
// ============================================
// async/await es "azúcar sintáctica" sobre Promises.
// Hace que el código asíncrono sea tan legible como el síncrono.
// El 'await' pausa la función actual (NO el Event Loop) hasta que
// la Promise se resuelva.

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { User, Product } from './types.js';

// Descomenta las siguientes líneas:
// export async function loadUsersWithAsync(): Promise<User[]> {
//   const filePath = join(import.meta.dirname, '..', 'data', 'users.json');
//
//   try {
//     // await suspende esta función hasta que readFile complete.
//     // Mientras tanto, el Event Loop puede procesar otras tareas.
//     const raw = await readFile(filePath, 'utf-8');
//     return JSON.parse(raw) as User[];
//   } catch (err) {
//     const message = err instanceof Error ? err.message : String(err);
//     throw new Error(`Failed to load users: ${message}`);
//   }
// }

// Descomenta también esta función para el Paso 5 (carga paralela):
// export async function loadProductsWithAsync(): Promise<Product[]> {
//   const filePath = join(import.meta.dirname, '..', 'data', 'products.json');
//
//   try {
//     const raw = await readFile(filePath, 'utf-8');
//     return JSON.parse(raw) as Product[];
//   } catch (err) {
//     const message = err instanceof Error ? err.message : String(err);
//     throw new Error(`Failed to load products: ${message}`);
//   }
// }
