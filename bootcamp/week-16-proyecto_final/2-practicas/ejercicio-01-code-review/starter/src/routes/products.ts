import { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

// ============================================================
// PASO 4: Arquitectura en capas
// ============================================================
// Esta ruta llama a Prisma directamente — viola la separación
// de responsabilidades. El controller no debe saber de Prisma.
// Descomenta el import del service al final para corregirlo.
// ============================================================

const prisma = new PrismaClient(); // ← problema: Prisma en el router

export const productRouter = Router();

// GET /products — lista todos los productos
productRouter.get('/', async (_req: Request, res: Response) => {
  // ❌ PROBLEMA DE ARQUITECTURA: acceso directo a DB en el router
  const products = await prisma.product.findMany();
  res.json({ data: products });

  // ============================================================
  // PASO 4 CORRECCIÓN: descomenta y borra el código anterior
  // ============================================================
  // const products = await productService.getAll();
  // res.json({ data: products });
});

// GET /products/:id
productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  // ❌ PROBLEMA: Si no existe, Prisma lanza P2025 sin formato
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: req.params.id },
  });
  res.json({ data: product });

  // ============================================================
  // PASO 4 CORRECCIÓN: descomenta y borra el código anterior
  // ============================================================
  // const product = await productService.getById(req.params.id);
  // if (!product) return next(new AppError(404, 'Product not found'));
  // res.json({ data: product });
});

// POST /products — crear producto
productRouter.post('/', async (req: Request, res: Response) => {
  // ============================================================
  // PASO 1: Validación de inputs
  // ============================================================
  // Sin validación, cualquier dato llega a Prisma.
  // Descomenta el bloque de validación Zod:
  // ============================================================

  // import { z } from 'zod';
  // const createProductSchema = z.object({
  //   name: z.string().min(1),
  //   price: z.number().positive(),
  //   stock: z.number().int().nonnegative().optional(),
  // });
  //
  // const result = createProductSchema.safeParse(req.body);
  // if (!result.success) {
  //   return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  // }
  // const dto = result.data;

  // ❌ PROBLEMA: datos sin validar van directo a Prisma
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json({ data: product });
});

// ============================================================
// PASO 4: Service (importar después del PASO 4)
// ============================================================
// import { productService } from '../services/product.service';
// import { AppError } from '../errors/app-error';
