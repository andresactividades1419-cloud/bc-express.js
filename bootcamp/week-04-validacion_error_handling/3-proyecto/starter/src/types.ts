// ============================================
// TYPES — adapta Item al recurso de tu dominio
// Ejemplo: Book, Medicine, Member, Dish, etc.
// ============================================

// TODO: renombra Item y sus campos al recurso de tu dominio asignado
export interface Item {
  id: number;
  name: string;       // Renombra según tu dominio (title, medicationName, etc.)
  description: string; // Puedes cambiar este campo por otros relevantes
  price: number;
  stock: number;
  createdAt: Date;
}

// Tipos de respuesta genéricos — no necesitan cambio
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
