// ============================================
// TYPES: Interfaz del recurso principal
// ============================================
// Adapta los campos de Item a tu dominio asignado.
//
// Ejemplos por dominio:
// - Biblioteca:   title: string; author: string; isbn: string; year: number;
// - Farmacia:     name: string; price: number; stock: number; category: string;
// - Gimnasio:     name: string; plan: string; memberSince: string;
// - Restaurante:  name: string; price: number; category: string; available: boolean;
// - Hotel:        roomNumber: string; type: string; pricePerNight: number; available: boolean;

export interface Item {
  id: number;
  // TODO: reemplazar estos campos por los de tu dominio
  name: string;
  description: string;
}

// DTO usado para crear un nuevo item (sin id, se genera automáticamente)
export type CreateItemDto = Omit<Item, 'id'>;

// DTO para actualización (todos los campos editables)
export type UpdateItemDto = Partial<CreateItemDto>;
