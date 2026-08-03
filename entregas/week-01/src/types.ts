// ============================================
// TIPOS — Dominio: Productora de Eventos
// ============================================

/**
 * Representa un Evento organizado por la Productora
 */
export interface Event {
  id: string;
  name: string;
  category: string; // concierto, boda, conferencia, corporativo, exposicion, festival
  price: number; // presupuesto asignado / costo total del evento en COP
  capacity: number; // aforo máximo estimado
  active: boolean; // true = confirmado/en desarrollo, false = inactivo/cancelado
  location: string;
  date: string;
}

/**
 * Estructura del resumen estadístico calculado
 */
export interface EventSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: Event;
  cheapest: Event;
  categories: string[];
}

/**
 * Estructura del reporte final que se escribe en output/report.json
 */
export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: EventSummary;
  items: Event[];
}
