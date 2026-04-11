// ============================================
// PASO 2 — Patrón con Promises (el intermedio)
// ============================================
// Las Promises representan un valor que estará disponible en el futuro.
// Se encadenan con .then() para transformaciones y .catch() para errores.
// 'fs/promises' ya devuelve Promises — no necesitamos envolver nada.

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { User } from './types.js';

// Descomenta las siguientes líneas:
// export function loadUsersWithPromise(): Promise<User[]> {
//   const filePath = join(import.meta.dirname, '..', 'data', 'users.json');
//
//   // .then() transforma el resultado — se encadenan en secuencia
//   return readFile(filePath, 'utf-8')
//     .then((raw) => JSON.parse(raw) as User[])
//     .catch((err: unknown) => {
//       // .catch() atrapa cualquier error en la cadena
//       const message = err instanceof Error ? err.message : String(err);
//       throw new Error(`Failed to load users: ${message}`);
//     });
// }
