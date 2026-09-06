// ============================================
// TYPES — Dominio: Productora de Eventos
// ============================================

export interface Event {
  id: number;
  name: string;
  category: string; // concierto, boda, conferencia, corporativo, festival, exposicion
  price: number; // Presupuesto asignado en COP
  capacity: number; // Aforo máximo estimado
  active: boolean; // Estado del evento
  location: string; // Recinto o locación del evento
  date: string; // Fecha programada (ISO 8601)
  createdAt: Date;
}

// Tipos de respuesta estandarizados
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
