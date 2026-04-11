// ============================================
// PASO 3: Procesar datos y generar el reporte
// ============================================
// Descomenta las siguientes líneas para el Paso 3:

// import type { Product, Report } from './types.js';
//
// export function generateReport(products: Product[]): Report {
//   const totalValue = products.reduce(
//     (sum, p) => sum + p.price * p.stock,
//     0
//   );
//   const categories = [...new Set(products.map((p) => p.category))];
//   const lowStockItems = products.filter((p) => p.stock < 5);
//
//   return {
//     totalProducts: products.length,
//     totalValue,
//     categories,
//     lowStockItems,
//   };
// }
