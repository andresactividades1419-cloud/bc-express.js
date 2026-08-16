// ============================================
// ENTRY POINT — CLI Productora de Eventos
// ============================================

import { readEvents } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

/**
 * Extrae el argumento opcional --category de la línea de comandos
 */
function parseCategoryArg(): string | null {
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');

  if (categoryIndex !== -1 && categoryIndex + 1 < args.length) {
    return args[categoryIndex + 1];
  }

  return null;
}

/**
 * Función principal encargada de orquestar el flujo del procesador CLI de eventos
 */
async function main(): Promise<void> {
  try {
    const categoryFilter = parseCategoryArg();

    console.log('🎪 =======================================================');
    console.log('       PRODUCTORA DE EVENTOS — PROCESADOR DE DATOS        ');
    console.log('===========================================================');
    if (categoryFilter) {
      console.log(`🔍 Filtro aplicado (--category): '${categoryFilter}'`);
    } else {
      console.log('🔍 Filtro aplicado: Ninguno (Mostrando todos los eventos)');
    }

    // 1. Lectura asíncrona de datos desde data/events.json
    const allEvents = await readEvents();

    // 2. Filtrado por categoría si fue especificada
    const filteredEvents = filterByCategory(allEvents, categoryFilter);

    // 3. Cálculo de métricas y resumen estadístico
    const summary = calculateSummary(filteredEvents);

    // 4. Construcción del objeto Report
    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filteredEvents,
    };

    // 5. Presentación formateada de resultados en consola
    console.log('\n📊 RESUMEN EJECUTIVO DE EVENTOS:');
    console.log(`   • Total de eventos procesados: ${summary.total}`);
    console.log(`   • Eventos activos (confirmados): ${summary.active}`);
    console.log(`   • Eventos inactivos (cancelados): ${summary.inactive}`);
    console.log(`   • Presupuesto promedio: $${summary.averagePrice.toLocaleString('es-CO')} COP`);
    console.log(`   • Evento de mayor presupuesto: "${summary.mostExpensive.name}" ($${summary.mostExpensive.price.toLocaleString('es-CO')} COP)`);
    console.log(`   • Evento de menor presupuesto: "${summary.cheapest.name}" ($${summary.cheapest.price.toLocaleString('es-CO')} COP)`);
    console.log(`   • Categorías identificadas: [${summary.categories.join(', ')}]`);

    // 6. Escritura asíncrona del reporte en output/report.json
    await writeReport(report);
    console.log('✅ Proceso completado exitosamente.\n');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('\n❌ ERROR DURANTE LA EJECUCIÓN:');
    console.error(`   ${message}\n`);
    process.exit(1);
  }
}

// Ejecución del punto de entrada principal
main();
