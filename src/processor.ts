// ============================================
// PROCESSOR — Lógica de filtrado y estadísticas
// ============================================

import type { Event, EventSummary } from './types.js';

/**
 * Filtra la lista de eventos por categoría (case-insensitive).
 * Si categoryFilter es null, retorna todos los eventos.
 * Si no existen eventos en la categoría solicitada, lanza un error listando las categorías disponibles.
 */
export function filterByCategory(events: Event[], categoryFilter: string | null): Event[] {
  if (!categoryFilter) {
    return events;
  }

  const normalizedFilter = categoryFilter.trim().toLowerCase();
  const filtered = events.filter(event => event.category.toLowerCase() === normalizedFilter);

  if (filtered.length === 0) {
    const availableCategories = Array.from(new Set(events.map(e => e.category))).join(', ');
    throw new Error(
      `No se encontraron eventos en la categoría '${categoryFilter}'. Categorías disponibles: [${availableCategories}]`
    );
  }

  return filtered;
}

/**
 * Calcula estadísticas avanzadas sobre el listado de eventos proporcionado.
 */
export function calculateSummary(events: Event[]): EventSummary {
  if (events.length === 0) {
    throw new Error('No es posible calcular estadísticas para un conjunto de eventos vacío.');
  }

  const total = events.length;
  const activeEvents = events.filter(e => e.active);
  const inactiveEvents = events.filter(e => !e.active);

  const totalPrice = events.reduce((sum, event) => sum + event.price, 0);
  const averagePrice = Number((totalPrice / total).toFixed(2));

  // Evento con el presupuesto más alto y más bajo
  const sortedByPrice = [...events].sort((a, b) => b.price - a.price);
  const mostExpensive = sortedByPrice[0];
  const cheapest = sortedByPrice[sortedByPrice.length - 1];

  // Categorías únicas
  const categories = Array.from(new Set(events.map(e => e.category)));

  return {
    total,
    active: activeEvents.length,
    inactive: inactiveEvents.length,
    averagePrice,
    mostExpensive,
    cheapest,
    categories,
  };
}
