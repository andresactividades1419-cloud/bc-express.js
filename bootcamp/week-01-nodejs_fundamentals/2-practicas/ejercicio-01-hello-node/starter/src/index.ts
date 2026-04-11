// ============================================
// PASO 4: Entry point — orquestar la ejecución
// ============================================
// Descomenta las siguientes líneas para el Paso 4:

// import { readProducts } from './reader.js';
// import { generateReport } from './processor.js';
//
// async function main(): Promise<void> {
//   try {
//     console.log('Reading product data...\n');
//
//     const products = await readProducts();
//     const report = generateReport(products);
//
//     console.log('=== Product Report ===');
//     console.log(`Total products:          ${report.totalProducts}`);
//     console.log(`Total inventory value:   $${report.totalValue.toFixed(2)}`);
//     console.log(`Categories:              ${report.categories.join(', ')}`);
//
//     if (report.lowStockItems.length > 0) {
//       console.log('\n⚠️  Low stock items (< 5 units):');
//       report.lowStockItems.forEach((p) => {
//         console.log(`  - ${p.name} (stock: ${p.stock})`);
//       });
//     } else {
//       console.log('\n✅ All items have sufficient stock.');
//     }
//   } catch (error) {
//     console.error('Error:', error instanceof Error ? error.message : error);
//     process.exit(1);
//   }
// }
//
// main();
