// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Item, ItemSummary } from './types.js';

// TODO: Implementar filterByCategory
// Debe:
// 1. Si categoryFilter es null, retornar todos los items
// 2. Si categoryFilter está definido, retornar solo los items de esa categoría
//    (comparación case-insensitive con .toLowerCase())
// 3. Si no hay items en esa categoría, lanzar un Error que liste las categorías disponibles
//
// Firma esperada:
// export function filterByCategory(items: Item[], categoryFilter: string | null): Item[]

// TODO: Implementar calculateSummary
// Debe calcular y retornar un objeto ItemSummary con:
// - total: longitud del array
// - active: items con active === true
// - inactive: items con active === false
// - averagePrice: precio promedio redondeado a 2 decimales
// - mostExpensive: item con el mayor precio
// - cheapest: item con el menor precio
// - categories: array de categorías únicas (sin repetición)
//
// Pistas:
// - Usa .reduce() para sumar precios
// - Usa .filter() para separar activos e inactivos
// - Usa new Set() + Array.from() para categorías únicas
// - Usa Math.max/min o sort para el más caro/barato
//
// Firma esperada:
// export function calculateSummary(items: Item[]): ItemSummary
