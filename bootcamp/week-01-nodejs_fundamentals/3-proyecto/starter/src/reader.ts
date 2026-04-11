// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Item } from './types.js';

// TODO: Implementar la función readItems
// Debe:
// 1. Construir la ruta al archivo data/items.json usando join() e import.meta.dirname
// 2. Leer el archivo con readFile (de 'fs/promises') usando 'utf-8'
// 3. Parsear el JSON y retornar el array de Item[]
// 4. Si ocurre un error, lanzar un Error descriptivo con el mensaje original
//
// Firma esperada:
// export async function readItems(): Promise<Item[]>
//
// Ejemplo de estructura:
// export async function readItems(): Promise<Item[]> {
//   const filePath = join(import.meta.dirname, '..', 'data', 'items.json');
//   try {
//     const raw = await readFile(filePath, 'utf-8');
//     return JSON.parse(raw) as Item[];
//   } catch (err) {
//     // Lanza un error descriptivo — el main() lo atrapará con try/catch
//     throw new Error(`...`);
//   }
// }
