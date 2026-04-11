// ============================================
// CONTROLLER — delgado, llama al service
// ============================================
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as service from '../services/products.service';
import { SingleResponse, PaginatedResponse } from '../types';

// ============================================
// PASO 4 — Schema para validar :id en params
// Descomenta las siguientes líneas:
// ============================================
// import {
//   createProductSchema,
//   updateProductSchema,
//   CreateProductDto,
//   UpdateProductDto,
// } from '../schemas/product.schema';

// ============================================
// UTIL INTERNO — valida que :id sea numérico
// Descomenta las siguientes líneas:
// ============================================
// const idSchema = z.coerce.number().int().positive({
//   message: 'El id debe ser un número entero positivo',
// });

// ============================================
// GET /products?page=1&limit=10 (ya funciona)
// ============================================
export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query['page']) || 1;
    const limit = Number(req.query['limit']) || 10;
    const result = await service.findAll({ page, limit });
    res.json(result satisfies PaginatedResponse<typeof result.data[number]>);
  } catch (err) {
    next(err);
  }
}

// ============================================
// GET /products/:id
// PASO 4: descomenta la validación de :id
// ============================================
export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 4a — Reemplaza esta línea con la validación de :id
    const id = Number(req.params['id']);

    // PASO 4 — Validación de :id con idSchema
    // Descomenta las siguientes líneas y elimina la línea de arriba:
    // const parsed = idSchema.safeParse(req.params['id']);
    // if (!parsed.success) {
    //   res.status(400).json({
    //     error: 'Validation Error',
    //     message: 'Parámetro inválido',
    //     issues: parsed.error.issues.map((issue) => ({
    //       field: issue.path.join('.') || 'id',
    //       message: issue.message,
    //     })),
    //   });
    //   return;
    // }
    // const id = parsed.data;

    const product = await service.findById(id);
    if (!product) {
      res.status(404).json({ error: 'Not Found', message: `Product ${id} not found` });
      return;
    }
    res.json({ data: product } satisfies SingleResponse<typeof product>);
  } catch (err) {
    next(err);
  }
}

// ============================================
// POST /products
// PASO 2: valida req.body con createProductSchema
// ============================================
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // PASO 2 — Validar req.body con createProductSchema
    // Descomenta las siguientes líneas y elimina el bloque "sin validación" de abajo:
    // const result = createProductSchema.safeParse(req.body);
    // if (!result.success) {
    //   res.status(400).json({
    //     error: 'Validation Error',
    //     message: 'Datos de entrada inválidos',
    //     issues: result.error.issues.map((issue) => ({
    //       field: issue.path.join('.'),
    //       message: issue.message,
    //     })),
    //   });
    //   return;
    // }
    // const dto: CreateProductDto = result.data;

    // Sin validación (temporalmente, reemplazar con PASO 2)
    const dto = req.body as { name: string; price: number; stock?: number };

    const product = await service.create(dto);
    res.status(201).json({ data: product } satisfies SingleResponse<typeof product>);
  } catch (err) {
    next(err);
  }
}

// ============================================
// PUT /products/:id
// PASO 3: valida req.body con updateProductSchema
// PASO 4: valida :id con idSchema
// ============================================
export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 4b — Reemplaza esta línea con la validación de :id (igual que getById)
    const id = Number(req.params['id']);

    // PASO 3 — Validar req.body con updateProductSchema
    // Descomenta las siguientes líneas y elimina el bloque "sin validación" de abajo:
    // const result = updateProductSchema.safeParse(req.body);
    // if (!result.success) {
    //   res.status(400).json({
    //     error: 'Validation Error',
    //     message: 'Datos de entrada inválidos',
    //     issues: result.error.issues.map((issue) => ({
    //       field: issue.path.join('.'),
    //       message: issue.message,
    //     })),
    //   });
    //   return;
    // }
    // const dto: UpdateProductDto = result.data;

    // Sin validación (temporalmente, reemplazar con PASO 3)
    const dto = req.body as { name?: string; price?: number; stock?: number };

    const product = await service.update(id, dto);
    if (!product) {
      res.status(404).json({ error: 'Not Found', message: `Product ${id} not found` });
      return;
    }
    res.json({ data: product } satisfies SingleResponse<typeof product>);
  } catch (err) {
    next(err);
  }
}

// ============================================
// DELETE /products/:id
// PASO 4: valida :id con idSchema
// ============================================
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Paso 4c — Reemplaza esta línea con la validación de :id (igual que getById)
    const id = Number(req.params['id']);

    const deleted = await service.remove(id);
    if (!deleted) {
      res.status(404).json({ error: 'Not Found', message: `Product ${id} not found` });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
