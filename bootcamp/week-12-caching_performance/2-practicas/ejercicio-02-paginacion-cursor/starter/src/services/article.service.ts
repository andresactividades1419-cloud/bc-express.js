import { Article } from '@prisma/client';
import { prisma } from '../lib/prisma';

export interface CursorPaginationResult<T> {
  data: T[];
  hasNextPage: boolean;
  nextCursor: string | null;
}

export interface OffsetPaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function findAllWithCursor(
  limit: number,
  cursor?: string,
): Promise<CursorPaginationResult<Article>> {
  // ============================================================
  // PASO 2: Query con cursor en Prisma
  // ============================================================
  // El truco: pedimos limit + 1 elementos.
  // Si obtenemos más de 'limit', hay una página siguiente.
  //
  // Descomenta las siguientes líneas y elimina el placeholder:

  // const take = limit + 1;
  //
  // const items = await prisma.article.findMany({
  //   take,
  //   // Si hay cursor, empezar DESPUÉS del artículo con ese ID
  //   ...(cursor && {
  //     cursor: { id: cursor },
  //     skip: 1, // skip: 1 saltea el cursor mismo, no lo incluye en resultados
  //   }),
  //   orderBy: { createdAt: 'desc' },
  // });

  // Placeholder — retorna datos sin cursor real:
  const items = await prisma.article.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  // ============================================================
  // PASO 3: Calcular hasNextPage y nextCursor
  // ============================================================
  // Si items.length > limit, hay más datos.
  // El nextCursor es el ID del último artículo que SÍ retornamos.
  // (no del elemento extra que pedimos para detectar hasNextPage)
  //
  // Descomenta las siguientes líneas y elimina el placeholder:

  // const hasNextPage = items.length > limit;
  // const data = hasNextPage ? items.slice(0, limit) : items;
  // const nextCursor = hasNextPage ? data[data.length - 1].id : null;

  // Placeholder:
  const hasNextPage = false;
  const data = items;
  const nextCursor = null;

  return { data, hasNextPage, nextCursor };
}

export async function findAllWithOffset(
  page: number,
  limit: number,
): Promise<OffsetPaginationResult<Article>> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.article.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.article.count(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
