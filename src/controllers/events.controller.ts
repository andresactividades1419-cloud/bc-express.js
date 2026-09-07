import { Request, Response, NextFunction } from 'express';
import { eventsService } from '../services/events.service.js';
import { AppError } from '../errors/AppError.js';

export class EventsController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter: Record<string, unknown> = {};
      if (req.query['status']) {
        filter['status'] = req.query['status'];
      }
      if (req.query['type']) {
        filter['type'] = req.query['type'];
      }

      const events = await eventsService.getAll(filter);
      res.status(200).json({
        success: true,
        count: events.length,
        data: events
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params['id']);
      const event = await eventsService.getById(id);
      res.status(200).json({
        success: true,
        data: event
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.sub) {
        throw new AppError(401, 'No autenticado: identificador de usuario ausente');
      }

      const event = await eventsService.create(req.body, req.user.sub);
      res.status(201).json({
        success: true,
        data: event
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params['id']);
      const event = await eventsService.update(id, req.body);
      res.status(200).json({
        success: true,
        data: event
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params['id']);
      await eventsService.delete(id);
      res.status(200).json({
        success: true,
        message: 'Evento eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}

export const eventsController = new EventsController();
