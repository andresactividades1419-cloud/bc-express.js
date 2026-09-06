import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';
import { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.event.findMany({
      skip,
      take: limit,
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.event.count(),
  ]);

  return {
    data,
    total,
    page,
    limit,
  };
}

export async function findById(id: number) {
  return prisma.event.findUnique({
    where: { id },
    include: {
      client: true,
    },
  });
}

export async function findByCode(code: string) {
  return prisma.event.findUnique({
    where: { code },
    include: {
      client: true,
    },
  });
}

export async function create(data: CreateEventDto) {
  try {
    return await prisma.event.create({
      data: {
        name: data.name,
        code: data.code,
        category: data.category,
        price: data.price,
        capacity: data.capacity,
        active: data.active,
        location: data.location,
        date: new Date(data.date),
        clientId: data.clientId,
      },
      include: {
        client: true,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe un evento con ese código único o registro duplicado');
      }
      if (err.code === 'P2003') {
        throw new AppError(400, 'El cliente referenciado no existe en la base de datos');
      }
    }
    throw err;
  }
}

export async function update(id: number, data: UpdateEventDto) {
  try {
    return await prisma.event.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.code !== undefined && { code: data.code }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.capacity !== undefined && { capacity: data.capacity }),
        ...(data.active !== undefined && { active: data.active }),
        ...(data.location !== undefined && { location: data.location }),
        ...(data.date !== undefined && { date: new Date(data.date) }),
        ...(data.clientId !== undefined && { clientId: data.clientId }),
      },
      include: {
        client: true,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, `Evento con ID ${id} no encontrado`);
      }
      if (err.code === 'P2002') {
        throw new AppError(409, 'Ya existe un evento con ese código único');
      }
      if (err.code === 'P2003') {
        throw new AppError(400, 'El cliente referenciado no existe en la base de datos');
      }
    }
    throw err;
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(404, `Evento con ID ${id} no encontrado`);
      }
    }
    throw err;
  }
}
