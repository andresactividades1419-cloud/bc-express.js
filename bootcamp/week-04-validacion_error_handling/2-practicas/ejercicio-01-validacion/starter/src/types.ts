// ============================================
// TYPES — Tipos base del dominio
// ============================================
// En este ejercicio los DTOs se inferirán desde
// los schemas Zod (no se definen aquí).
// Solo dejamos la entidad completa.

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
}

// Contratos de respuesta
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
  issues: { field: string; message: string }[];
}

export interface ErrorResponse {
  error: string;
  message: string;
}
