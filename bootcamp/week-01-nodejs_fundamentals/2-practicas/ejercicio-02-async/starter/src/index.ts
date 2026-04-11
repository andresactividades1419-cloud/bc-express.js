// ============================================
// PASO 4 + 5 — Orquestador: comparar los tres patrones
// ============================================
// Este archivo importa los tres módulos y ejecuta cada patrón
// para verificar que los tres producen el mismo resultado.

import { loadUsersWithCallback } from './01-callbacks.js';
import { loadUsersWithPromise } from './02-promises.js';
import { loadUsersWithAsync, loadProductsWithAsync } from './03-async.js';

console.log('=== Ejercicio 02: Patrones Asíncronos ===\n');

// -----------------------------------------------
// PASO 4 — Comparar los tres patrones
// -----------------------------------------------
// Descomenta las siguientes líneas:

// // 1️⃣ Callbacks — el enfoque más antiguo
// loadUsersWithCallback((err, users) => {
//   if (err) {
//     console.error('❌ Callback error:', err.message);
//     return;
//   }
//   console.log(`✅ Callbacks       → ${users?.length} users cargados`);
//   console.log('   Primer usuario:', users?.[0].name);
// });

// // 2️⃣ Promises — encadenado
// loadUsersWithPromise()
//   .then((users) => {
//     console.log(`✅ Promises        → ${users.length} users cargados`);
//     console.log('   Primer usuario:', users[0].name);
//   })
//   .catch((err: Error) => console.error('❌ Promise error:', err.message));

// // 3️⃣ async/await — el estándar moderno
// const runComparison = async (): Promise<void> => {
//   try {
//     const users = await loadUsersWithAsync();
//     console.log(`✅ Async/Await     → ${users.length} users cargados`);
//     console.log('   Primer usuario:', users[0].name);
//   } catch (err) {
//     console.error('❌ Async error:', err instanceof Error ? err.message : err);
//   }
// };
// runComparison();

// -----------------------------------------------
// PASO 5 — Operaciones paralelas con Promise.all
// -----------------------------------------------
// Descomenta las siguientes líneas:

// const runParallel = async (): Promise<void> => {
//   console.log('\n--- Carga Paralela con Promise.all ---');
//
//   console.time('parallel');
//   // Promise.all inicia AMBAS lecturas simultáneamente
//   // El tiempo total ≈ max(tiempo_users, tiempo_products), no la suma
//   const [users, products] = await Promise.all([
//     loadUsersWithAsync(),
//     loadProductsWithAsync(),
//   ]);
//   console.timeEnd('parallel');
//
//   console.log(`✅ Cargados en paralelo:`);
//   console.log(`   ${users.length} users, ${products.length} products`);
//
//   // Filtrar solo usuarios activos
//   const activeUsers = users.filter((u) => u.active);
//   console.log(`   Usuarios activos: ${activeUsers.length}`);
// };
// runParallel();
