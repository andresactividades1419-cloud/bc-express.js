// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Reglas de esta capa:
// - Único punto de acceso al store (array, DB, archivo)
// - Todos los métodos deben ser async Promise<T>
// - Retornar copias defensivas (no la referencia interna)
// - Si no encuentra un elemento, retornar undefined
//
// TODO: Renombra "Item" por el modelo de tu dominio
// TODO: Agrega datos iniciales coherentes con tu dominio

import { Item, CreateItemDto, UpdateItemDto } from '../types';

// TODO: Inicializa el store con 3-5 elementos de tu dominio
const store: Item[] = [
  // Ejemplo — reemplaza con datos de tu dominio:
  // { id: 1, name: 'Ejemplo 1', description: 'Descripcion', active: true, createdAt: new Date().toISOString() },
];
let nextId = 1;

export async function findAll(): Promise<Item[]> {
  // TODO: Retornar copia defensiva del array completo
  // return [...store];
  throw new Error('Not implemented');
}

export async function findById(id: number): Promise<Item | undefined> {
  // TODO: Buscar por id y retornar el elemento o undefined
  // return store.find((item) => item.id === id);
  throw new Error('Not implemented');
}

export async function create(dto: CreateItemDto): Promise<Item> {
  // TODO: Crear el item con id auto-incremental y createdAt
  // const item: Item = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  // store.push(item);
  // return { ...item }; // copia defensiva
  throw new Error('Not implemented');
}

export async function update(id: number, dto: UpdateItemDto): Promise<Item | undefined> {
  // TODO: Encontrar el index, fusionar cambios, retornar copia
  // const index = store.findIndex((item) => item.id === id);
  // if (index === -1) return undefined;
  // store[index] = { ...store[index]!, ...dto };
  // return { ...store[index]! };
  throw new Error('Not implemented');
}

export async function remove(id: number): Promise<boolean> {
  // TODO: Eliminar y retornar true; si no existe, retornar false
  // const index = store.findIndex((item) => item.id === id);
  // if (index === -1) return false;
  // store.splice(index, 1);
  // return true;
  throw new Error('Not implemented');
}
