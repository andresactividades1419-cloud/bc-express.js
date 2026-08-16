// ============================================
// WRITER — Escritura asíncrona de report.json
// ============================================

import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { Report } from './types.js';

/**
 * Escribe el reporte final serializado en formato JSON dentro de output/report.json.
 * Crea el directorio output/ si no existe.
 */
export async function writeReport(report: Report): Promise<void> {
  const outputDir = join(import.meta.dirname, '..', 'output');
  const outputPath = join(outputDir, 'report.json');

  try {
    await mkdir(outputDir, { recursive: true });
    const jsonContent = JSON.stringify(report, null, 2);
    await writeFile(outputPath, jsonContent, 'utf-8');
    console.log(`\n💾 Reporte generado con éxito en: ${outputPath}`);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error al escribir el reporte en '${outputPath}': ${errMessage}`);
  }
}
