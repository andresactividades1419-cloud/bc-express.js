import { Request, Response, NextFunction } from 'express';
import { cursorPaginationSchema, offsetPaginationSchema } from '../validators/pagination.schema';
import * as articleService from '../services/article.service';

export async function getAllCursor(req: Request, res: Response, next: NextFunction) {
  try {
    const { cursor, limit } = cursorPaginationSchema.parse(req.query);
    const result = await articleService.findAllWithCursor(limit, cursor);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getAllOffset(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, limit } = offsetPaginationSchema.parse(req.query);
    const result = await articleService.findAllWithOffset(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
