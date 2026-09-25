export type UserRole = 'user' | 'admin';

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  sub: string;
  role: UserRole;
}

// ============================================================
// Dominio: Productora de Eventos — recurso principal Event
// ============================================================
export type EventCategory =
  | 'concierto'
  | 'boda'
  | 'conferencia'
  | 'corporativo'
  | 'festival'
  | 'exposicion';

export interface CreateEventDto {
  name: string;
  code: string;
  category: EventCategory;
  price: number;
  capacity: number;
  location: string;
  date: string;
}

export interface UpdateEventDto {
  name?: string;
  code?: string;
  category?: EventCategory;
  price?: number;
  capacity?: number;
  location?: string;
  date?: string;
}
