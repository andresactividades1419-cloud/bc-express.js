import type { Item, CreateItemDto, UpdateItemDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Los datos se pierden al reiniciar el servidor (se usará BD a partir de week-05)
const items: Item[] = [];
let nextId = 1;

// TODO: Implementar getAll
// Debe retornar todos los ítems del array
export function getAll(): Item[] {
  // TODO: retornar el array de items
  return [];
}

// TODO: Implementar getById
// Debe retornar el ítem con el id dado, o undefined si no existe
export function getById(id: number): Item | undefined {
  // TODO: buscar y retornar el ítem
  return undefined;
}

// TODO: Implementar create
// Debe crear un nuevo ítem con un id autoincremental y retornarlo
export function create(data: CreateItemDto): Item {
  // TODO: crear, guardar y retornar el nuevo ítem
  // Pista: usa nextId++ para generar el id
  const newItem: Item = { id: nextId++, ...data };
  return newItem;
}

// TODO: Implementar update
// Debe actualizar el ítem con el id dado y retornarlo, o undefined si no existe
export function update(id: number, data: UpdateItemDto): Item | undefined {
  // TODO: buscar el ítem, actualizar sus campos y retornarlo
  return undefined;
}

// TODO: Implementar remove
// Debe eliminar el ítem con el id dado y retornar true, o false si no existe
export function remove(id: number): boolean {
  // TODO: buscar y eliminar el ítem, retornar éxito
  return false;
}
