/**
 * Categorías permitidas para la Productora de Eventos
 */
export type EventCategory =
  | 'concierto'
  | 'boda'
  | 'conferencia'
  | 'corporativo'
  | 'festival'
  | 'exposicion';

/**
 * Entidad Principal del Dominio: Event (Evento de la Productora)
 */
export interface Event {
  id: string;
  name: string;
  category: EventCategory;
  price: number; // Presupuesto asignado en Pesos Colombianos (COP)
  capacity: number; // Aforo máximo estimado
  active: boolean; // Estado del evento (true = confirmado, false = cancelado)
  location: string; // Recinto o locación del evento
  date: string; // Fecha programada (ISO 8601)
}

/**
 * DTO para la creación de un nuevo evento
 */
export type CreateEventDto = Omit<Event, 'id'>;

/**
 * DTO para la actualización parcial o total de un evento existente
 */
export type UpdateEventDto = Partial<CreateEventDto>;

/**
 * Filtros de búsqueda para la consulta de eventos
 */
export interface EventQueryParams {
  category?: EventCategory;
  active?: boolean;
  search?: string;
}
