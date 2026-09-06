export interface ClientEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventEntity {
  id: number;
  name: string;
  code: string;
  category: string;
  price: number;
  capacity: number;
  active: boolean;
  location: string;
  date: Date;
  clientId: number;
  client?: ClientEntity;
  createdAt: Date;
  updatedAt: Date;
}

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
