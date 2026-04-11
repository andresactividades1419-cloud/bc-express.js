// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// ============================================
import { Item } from '../types';

export type CreateItemRepoDto = Omit<Item, 'id' | 'createdAt'>;
export type UpdateItemRepoDto = Partial<CreateItemRepoDto>;

// TODO: inicializar el array con al menos 3 ítems de seed correspondientes a tu dominio
let items: Item[] = [
  // TODO: reemplaza con datos reales de tu dominio
  { id: 1, name: 'Ejemplo Item 1', description: 'Descripción 1', price: 10.0, stock: 100, createdAt: new Date() },
  { id: 2, name: 'Ejemplo Item 2', description: 'Descripción 2', price: 20.0, stock: 50, createdAt: new Date() },
  { id: 3, name: 'Ejemplo Item 3', description: 'Descripción 3', price: 30.0, stock: 25, createdAt: new Date() },
];

let nextId = 4;

// TODO: implementar todos los métodos CRUD async
// Todos deben retornar Promise<T> y hacer copias defensivas ({ ...item })

export async function findAll(): Promise<Item[]> {
  // TODO: retornar copia del array
  return [...items];
}

export async function findById(id: number): Promise<Item | undefined> {
  // TODO: buscar por id y retornar copia defensiva o undefined
  return items.find((i) => i.id === id);
}

export async function create(dto: CreateItemRepoDto): Promise<Item> {
  // TODO: crear nuevo item con nextId++ y fecha actual
  const item: Item = { id: nextId++, ...dto, createdAt: new Date() };
  items.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdateItemRepoDto): Promise<Item | undefined> {
  // TODO: encontrar por id, aplicar cambios, retornar copia
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index]!, ...dto };
  return { ...items[index]! };
}

export async function remove(id: number): Promise<boolean> {
  // TODO: eliminar por id, retornar true si existía
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
