// Nota: los tipos de las entidades (Client, Event) NO se declaran a mano aquí.
// Se usan directamente los tipos que genera Prisma a partir de schema.prisma
// (import type { Client, Event } from '@prisma/client') para no duplicar el
// modelo de datos en dos lugares distintos.

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface SingleResponse<T> {
  data: T;
}

export interface ValidationErrorItem {
  field: string;
  message: string;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: ValidationErrorItem[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}
