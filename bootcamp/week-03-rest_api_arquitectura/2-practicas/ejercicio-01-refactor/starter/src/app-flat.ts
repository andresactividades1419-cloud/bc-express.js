// ============================================
// APP-FLAT — Aplicación sin arquitectura en capas
// ============================================
// Este archivo es el PUNTO DE PARTIDA del ejercicio.
// Analiza cómo está organizado y luego refactorízalo
// usando las 4 carpetas del proyecto.
//
// ¿Qué problemas tiene este código?
// 1. El store (datos) está mezclado con las rutas
// 2. La lógica de negocio (paginación, validación) está en el handler
// 3. No se puede probar con Jest sin levantar un servidor
// 4. Si cambias la BD, tienes que modificar los handlers uno a uno

import express, { Router, Request, Response } from 'express';
import { Product, CreateProductDto, UpdateProductDto } from './types';

export const flatRouter = Router();

// ⚠️ Problema 1: el store vive junto a las rutas
const products: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299.99, stock: 10, createdAt: new Date().toISOString() },
  { id: 2, name: 'Mouse Inalámbrico', price: 29.99, stock: 50, createdAt: new Date().toISOString() },
  { id: 3, name: 'Teclado Mecánico', price: 89.99, stock: 25, createdAt: new Date().toISOString() },
];
let nextId = 4;

// ⚠️ Problema 2: lógica de paginación mezclada con el handler HTTP
flatRouter.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query['page'] as string) || 1;
  const limit = parseInt(req.query['limit'] as string) || 10;
  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);

  // ⚠️ Respuesta sin contrato definido
  res.json(paginated);
});

flatRouter.get('/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params['id']));
  if (!product) {
    res.status(404).json({ message: 'Not found' }); // ⚠️ Sin contrato de error estándar
    return;
  }
  res.json(product); // ⚠️ Sin data wrapper
});

flatRouter.post('/', (req: Request, res: Response) => {
  const body = req.body as CreateProductDto;

  // ⚠️ Validación primitive mezclada con creación
  if (!body.name || body.price == null) {
    res.status(400).json({ message: 'name and price are required' });
    return;
  }

  const product: Product = {
    id: nextId++,
    name: body.name,
    price: body.price,
    stock: body.stock ?? 0,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  res.status(201).json(product);
});

flatRouter.put('/:id', (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params['id']));
  if (index === -1) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  const updates = req.body as UpdateProductDto;
  products[index] = { ...products[index]!, ...updates };
  res.json(products[index]);
});

flatRouter.delete('/:id', (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params['id']));
  if (index === -1) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  products.splice(index, 1);
  res.status(204).send();
});

// Exportar la app plana para que pueda usarse desde app.ts temporalmente
const flatApp = express();
flatApp.use(express.json());
flatApp.use('/api/v1/products', flatRouter);

export default flatApp;
