// ============================================
// PASO 1 — Patrón con Callbacks (el pasado)
// ============================================
// Los callbacks son funciones que Node.js llama cuando una
// operación asíncrona termina. Siguen el patrón "error-first":
// el primer argumento siempre es el error (o null si todo fue bien).

import { readFile } from 'fs';
import { join } from 'path';
import type { User } from './types.js';

// Descomenta las siguientes líneas:
// export function loadUsersWithCallback(
//   callback: (error: Error | null, users?: User[]) => void
// ): void {
//   const filePath = join(import.meta.dirname, '..', 'data', 'users.json');
//
//   // readFile de 'fs' (no 'fs/promises') usa el patrón callback
//   readFile(filePath, 'utf-8', (err, data) => {
//     if (err) {
//       // Error-first: pasamos el error como primer argumento
//       callback(new Error(`Could not read file: ${err.message}`));
//       return; // importante: salir para no ejecutar el código de abajo
//     }
//     try {
//       const users = JSON.parse(data) as User[];
//       callback(null, users); // null = sin error, users = resultado
//     } catch {
//       callback(new Error('Invalid JSON format in users.json'));
//     }
//   });
// }
