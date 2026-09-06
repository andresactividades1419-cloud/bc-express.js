import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Event } from '../models/event.model';
import { AppError } from '../errors/AppError';
import type { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string
): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

  const [data, total] = await Promise.all([
    Event.find(filter)
      .populate('client')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Event.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function findById(id: string): Promise<unknown> {
  try {
    const event = await Event.findById(id).populate('client').lean();
    if (!event) {
      throw new AppError(404, `Evento con ID ${id} no encontrado`);
    }
    return event;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID de evento con formato inválido: ${id}`);
    }
    throw err;
  }
}

export async function create(dto: CreateEventDto): Promise<unknown> {
  try {
    const event = await Event.create(dto);
    await event.populate('client');
    return event.toObject();
  } catch (err: unknown) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un evento registrado con ese código único');
    }
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'El ID de la referencia al cliente no tiene un formato válido');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      throw new AppError(400, err.message);
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateEventDto): Promise<unknown> {
  try {
    const event = await Event.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    })
      .populate('client')
      .lean();

    if (!event) {
      throw new AppError(404, `Evento con ID ${id} no encontrado`);
    }
    return event;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID con formato inválido: ${id}`);
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un evento registrado con ese código único');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      throw new AppError(400, err.message);
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      throw new AppError(404, `Evento con ID ${id} no encontrado`);
    }
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID con formato inválido: ${id}`);
    }
    throw err;
  }
}
