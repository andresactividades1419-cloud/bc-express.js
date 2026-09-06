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
  createdAt: string; // Timestamp de creación
}

// DTO para crear — sin campos generados por el sistema (id, createdAt)
export type CreateEventDto = Omit<Event, 'id' | 'createdAt'>;

// DTO para actualizar — todos los campos son opcionales
export type UpdateEventDto = Partial<CreateEventDto>;

// Contratos de respuesta estandarizados
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
