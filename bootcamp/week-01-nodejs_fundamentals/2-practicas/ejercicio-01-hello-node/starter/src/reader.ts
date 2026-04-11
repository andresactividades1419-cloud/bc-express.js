// ============================================
// PASO 2: Leer el archivo JSON con fs/promises
// ============================================
// Descomenta las siguientes líneas para el Paso 2:

// import { readFile } from 'fs/promises';
// import { join } from 'path';
// import type { Product } from './types.js';
//
// export async function readProducts(): Promise<Product[]> {
//   const filePath = join(import.meta.dirname, '..', 'data', 'products.json');
//   const raw = await readFile(filePath, 'utf-8');
//   return JSON.parse(raw) as Product[];
// }
