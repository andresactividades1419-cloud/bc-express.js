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
// Adaptar estos tipos al dominio asignado
// Ejemplos:
//   Biblioteca  → CreateBookDto, UpdateBookDto
//   Farmacia    → CreateMedicineDto, UpdateMedicineDto
//   Gimnasio    → CreateMemberDto, UpdateMemberDto
// ============================================================

export interface CreateItemDto {
  // TODO: Adaptar al dominio asignado
  // Ejemplo biblioteca:
  //   title: string;
  //   isbn: string;
  //   authorId: string;
  // Ejemplo farmacia:
  //   name: string;
  //   activeIngredient: string;
  //   stock: number;
  name: string;
  description?: string;
}

export interface UpdateItemDto {
  // TODO: Adaptar al dominio asignado (todos los campos opcionales en update)
  name?: string;
  description?: string;
}
