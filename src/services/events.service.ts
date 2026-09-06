// ============================================
// SERVICE — Lógica de negocio
// ============================================
// Reglas de esta capa:
// - Cero imports de Express (sin Request, Response ni NextFunction)
// - Llama al repository para acceder a datos
// - Contiene la paginación y validaciones de negocio
// - Retorna undefined cuando un recurso no existe; el controller maneja el 404

import {
  Event,
  CreateEventDto,
  UpdateEventDto,
  PaginatedResponse,
  PaginationParams,
} from '../types';
import * as repo from '../repositories/events.repository';

export async function findAll(params: PaginationParams): Promise<PaginatedResponse<Event>> {
  const { page, limit } = params;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    total: all.length,
    page,
    limit,
  };
}

export async function findById(id: number): Promise<Event | undefined> {
  return repo.findById(id);
}

export async function create(dto: CreateEventDto): Promise<Event> {
  if (!dto.name || dto.name.trim().length === 0) {
    throw new Error('El nombre del evento es requerido');
  }
  if (dto.price !== undefined && dto.price < 0) {
    throw new Error('El presupuesto asignado en COP debe ser mayor o igual a cero');
  }
  if (dto.capacity !== undefined && dto.capacity < 0) {
    throw new Error('El aforo debe ser mayor o igual a cero');
  }

  return repo.create(dto);
}

export async function update(id: number, dto: UpdateEventDto): Promise<Event | undefined> {
  const exists = await repo.findById(id);
  if (!exists) {
    return undefined;
  }

  if (dto.name !== undefined && dto.name.trim().length === 0) {
    throw new Error('El nombre del evento no puede estar vacío');
  }
  if (dto.price !== undefined && dto.price < 0) {
    throw new Error('El presupuesto asignado en COP debe ser mayor o igual a cero');
  }
  if (dto.capacity !== undefined && dto.capacity < 0) {
    throw new Error('El aforo debe ser mayor o igual a cero');
  }

  return repo.update(id, dto);
}

export async function remove(id: number): Promise<boolean> {
  const exists = await repo.findById(id);
  if (!exists) {
    return false;
  }
  return repo.remove(id);
}
