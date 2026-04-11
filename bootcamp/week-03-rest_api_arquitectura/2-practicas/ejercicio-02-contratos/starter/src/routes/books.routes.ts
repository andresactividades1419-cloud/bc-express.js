// ============================================
// ROUTES — books.routes.ts
// ============================================
// En este ejercicio todo está en un solo archivo de rutas
// para enfocarnos en los CONTRATOS, no en la arquitectura.
//
// Hay 4 bloques para descomentar en orden.

import { Router, Request, Response } from 'express';

export const booksRouter = Router();

// Store en memoria para el ejercicio
const books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, pages: 431 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas', year: 1999, pages: 352 },
  { id: 3, title: 'Design Patterns', author: 'Gang of Four', year: 1994, pages: 395 },
  { id: 4, title: 'Refactoring', author: 'Martin Fowler', year: 2018, pages: 448 },
  { id: 5, title: 'Domain-Driven Design', author: 'Eric Evans', year: 2003, pages: 560 },
  { id: 6, title: 'Working Effectively with Legacy Code', author: 'Michael Feathers', year: 2004, pages: 456 },
  { id: 7, title: 'The Art of Unit Testing', author: 'Roy Osherove', year: 2009, pages: 296 },
  { id: 8, title: 'You Dont Know JS', author: 'Kyle Simpson', year: 2015, pages: 278 },
];
let nextId = 9;

// ============================================
// PASO 3: GET / con paginación
// Descomenta el bloque siguiente
// ============================================
// booksRouter.get('/', (req: Request, res: Response) => {
//   const page = parseInt(req.query['page'] as string) || 1;
//   const limit = parseInt(req.query['limit'] as string) || 10;
//   const start = (page - 1) * limit;
//   const data = books.slice(start, start + limit);
//
//   // import { PaginatedResponse, Book } from '../types';
//   const response: PaginatedResponse<Book> = {
//     data,
//     total: books.length,
//     page,
//     limit,
//   };
//   res.json(response);
// });

// ============================================
// PASO 2: GET /:id con SingleResponse
// Descomenta el bloque siguiente
// ============================================
// booksRouter.get('/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params['id']);
//   const book = books.find((b) => b.id === id);
//
//   // PASO 4: contrato de error unificado en 404
//   if (!book) {
//     const err: ErrorResponse = { error: 'Not Found', message: `Book with id ${id} not found` };
//     res.status(404).json(err);
//     return;
//   }
//
//   const response: SingleResponse<Book> = { data: book };
//   res.json(response);
// });

// ============================================
// PASO 2: POST / con SingleResponse + status 201
// Descomenta el bloque siguiente
// ============================================
// booksRouter.post('/', (req: Request, res: Response) => {
//   const dto = req.body as CreateBookDto;
//
//   // PASO 4: contrato de error en validación
//   if (!dto.title || !dto.author) {
//     const err: ErrorResponse = { error: 'Bad Request', message: 'title and author are required' };
//     res.status(400).json(err);
//     return;
//   }
//
//   const book: Book = { id: nextId++, ...dto };
//   books.push(book);
//
//   const response: SingleResponse<Book> = { data: book };
//   res.status(201).json(response);
// });

// ============================================
// PASO 2: PUT /:id con SingleResponse
// Descomenta el bloque siguiente
// ============================================
// booksRouter.put('/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params['id']);
//   const index = books.findIndex((b) => b.id === id);
//
//   // PASO 4: contrato de error en 404
//   if (index === -1) {
//     const err: ErrorResponse = { error: 'Not Found', message: `Book with id ${id} not found` };
//     res.status(404).json(err);
//     return;
//   }
//
//   const dto = req.body as UpdateBookDto;
//   books[index] = { ...books[index]!, ...dto };
//
//   const response: SingleResponse<Book> = { data: books[index]! };
//   res.json(response);
// });

// ============================================
// PASO 2: DELETE /:id — sin body (204)
// Descomenta el bloque siguiente
// ============================================
// booksRouter.delete('/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params['id']);
//   const index = books.findIndex((b) => b.id === id);
//
//   // PASO 4: contrato de error en 404
//   if (index === -1) {
//     const err: ErrorResponse = { error: 'Not Found', message: `Book with id ${id} not found` };
//     res.status(404).json(err);
//     return;
//   }
//
//   books.splice(index, 1);
//   res.status(204).send();
// });

// Para que TypeScript no considere sin usar el router hasta que descomentas:
booksRouter.get('/ping', (_req, res) => res.json({ ok: true }));
