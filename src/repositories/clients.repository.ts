import mongoose from 'mongoose';
import { Client, IClient } from '../models/client.model';
import { AppError } from '../errors/AppError';
import { isMongoDuplicateKeyError } from '../lib/mongoErrors';
import type { CreateClientDto, UpdateClientDto } from '../schemas/client.schema';

export async function findAll(): Promise<IClient[]> {
  return Client.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<IClient> {
  try {
    const client = await Client.findById(id).lean();
    if (!client) {
      throw new AppError(404, `Cliente con ID ${id} no encontrado`);
    }
    return client;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID de cliente con formato inválido: ${id}`);
    }
    throw err;
  }
}

export async function create(dto: CreateClientDto): Promise<IClient> {
  try {
    const client = await Client.create(dto);
    return client.toObject();
  } catch (err: unknown) {
    if (isMongoDuplicateKeyError(err)) {
      throw new AppError(409, 'Ya existe un cliente registrado con ese correo electrónico');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      throw new AppError(400, err.message);
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateClientDto): Promise<IClient> {
  try {
    const client = await Client.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();

    if (!client) {
      throw new AppError(404, `Cliente con ID ${id} no encontrado`);
    }
    return client;
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID de cliente con formato inválido: ${id}`);
    }
    if (isMongoDuplicateKeyError(err)) {
      throw new AppError(409, 'Ya existe un cliente registrado con ese correo electrónico');
    }
    if (err instanceof mongoose.Error.ValidationError) {
      throw new AppError(400, err.message);
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      throw new AppError(404, `Cliente con ID ${id} no encontrado`);
    }
  } catch (err: unknown) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, `ID de cliente con formato inválido: ${id}`);
    }
    throw err;
  }
}
