// ============================================
// READER — Lectura asíncrona de events.json
// ============================================

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Event } from './types.js';

/**
 * Lee el archivo de datos events.json usando fs/promises y async/await.
 * @returns Promesa con el array de Eventos cargados.
 */
export async function readEvents(): Promise<Event[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'events.json');

  try {
    const rawData = await readFile(filePath, 'utf-8');
    const events: Event[] = JSON.parse(rawData);
    return events;
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error al leer el archivo de eventos en '${filePath}': ${errMessage}`);
  }
}
