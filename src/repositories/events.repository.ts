import mongoose from 'mongoose';
import { EventModel, IEvent } from '../models/event.model.js';
import { CreateEventDto, UpdateEventDto } from '../schemas/event.schema.js';
import { AppError } from '../errors/AppError.js';

export async function findAll(filter: Record<string, unknown> = {}): Promise<IEvent[]> {
  return EventModel.find(filter)
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 })
    .lean();
}

export async function findById(id: string): Promise<IEvent | null> {
  try {
    return await EventModel.findById(id)
      .populate('createdBy', 'name email role')
      .lean();
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID de evento con formato invalido: ${id}`);
    }
    throw err;
  }
}

export async function create(
  data: CreateEventDto & { createdBy: string | mongoose.Types.ObjectId }
): Promise<IEvent> {
  try {
    const event = await EventModel.create({
      ...data,
      date: new Date(data.date),
      createdBy: new mongoose.Types.ObjectId(data.createdBy),
    });
    await event.populate('createdBy', 'name email role');
    return event.toObject();
  } catch (err: unknown) {
    const anyErr = err as { code?: number };
    if (anyErr?.code === 11000) {
      throw new AppError(409, 'Ya existe un evento registrado con ese codigo unico');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      throw new AppError(400, err.message);
    }
    throw err;
  }
}

export async function updateById(
  id: string,
  data: UpdateEventDto
): Promise<IEvent | null> {
  try {
    const updatePayload: Record<string, unknown> = { ...data };
    if (data.date) {
      updatePayload['date'] = new Date(data.date);
    }

    return await EventModel.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    })
      .populate('createdBy', 'name email role')
      .lean();
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID con formato invalido: ${id}`);
    }
    const anyErr = err as { code?: number };
    if (anyErr?.code === 11000) {
      throw new AppError(409, 'Ya existe un evento registrado con ese codigo unico');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      throw new AppError(400, err.message);
    }
    throw err;
  }
}

export async function deleteById(id: string): Promise<boolean> {
  try {
    const deleted = await EventModel.findByIdAndDelete(id);
    return deleted !== null;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID con formato invalido: ${id}`);
    }
    throw err;
  }
}

export const eventsRepository = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
