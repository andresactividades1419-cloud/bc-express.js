import { Router, type Request, type Response } from 'express';
import { eventStore } from '../store.js';
import type { CreateEventDto, EventCategory, UpdateEventDto } from '../types.js';

export const eventsRouter = Router();

const VALID_CATEGORIES: EventCategory[] = [
  'concierto',
  'boda',
  'conferencia',
  'corporativo',
  'festival',
  'exposicion'
];

/**
 * GET /api/v1/events
 * Listar todos los eventos de la Productora (con soporte de filtros por query params)
 */
eventsRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const { category, active, search } = req.query;

  const filters = {
    category: category ? (String(category) as EventCategory) : undefined,
    active: active !== undefined ? active === 'true' : undefined,
    search: search ? String(search) : undefined
  };

  const events = await eventStore.getAll(filters);

  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});

/**
 * GET /api/v1/events/:id
 * Obtener un evento específico por ID
 */
eventsRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const id = String(req.params.id);
  const event = await eventStore.getById(id);

  if (!event) {
    res.status(404).json({
      success: false,
      error: `El evento con ID '${id}' no fue encontrado en la Productora`
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: event
  });
});

/**
 * POST /api/v1/events
 * Crear un nuevo evento en la Productora
 */
eventsRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, category, price, capacity, active, location, date } = req.body;

  // Validación de campos obligatorios del negocio
  if (!name || typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({
      success: false,
      error: 'El campo "name" es obligatorio y debe ser un texto válido'
    });
    return;
  }

  if (!category || !VALID_CATEGORIES.includes(category as EventCategory)) {
    res.status(400).json({
      success: false,
      error: `La categoría debe ser una de las siguientes: ${VALID_CATEGORIES.join(', ')}`
    });
    return;
  }

  if (typeof price !== 'number' || price <= 0) {
    res.status(400).json({
      success: false,
      error: 'El presupuesto "price" debe ser un número positivo en COP (Pesos Colombianos)'
    });
    return;
  }

  if (typeof capacity !== 'number' || capacity <= 0) {
    res.status(400).json({
      success: false,
      error: 'El aforo "capacity" debe ser un número entero positivo'
    });
    return;
  }

  if (!location || typeof location !== 'string') {
    res.status(400).json({
      success: false,
      error: 'La locación "location" es obligatoria'
    });
    return;
  }

  const dto: CreateEventDto = {
    name: name.trim(),
    category,
    price,
    capacity,
    active: active !== undefined ? Boolean(active) : true,
    location: location.trim(),
    date: date || new Date().toISOString()
  };

  const createdEvent = await eventStore.create(dto);

  res.status(201).json({
    success: true,
    message: 'Evento registrado con éxito en la Productora',
    data: createdEvent
  });
});

/**
 * PUT /api/v1/events/:id
 * Actualización completa o parcial de un evento existente
 */
eventsRouter.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const id = String(req.params.id);
  const existingEvent = await eventStore.getById(id);

  if (!existingEvent) {
    res.status(404).json({
      success: false,
      error: `No es posible actualizar. El evento con ID '${id}' no existe`
    });
    return;
  }

  const { name, category, price, capacity, active, location, date } = req.body;

  if (category && !VALID_CATEGORIES.includes(category as EventCategory)) {
    res.status(400).json({
      success: false,
      error: `La categoría debe ser una de las siguientes: ${VALID_CATEGORIES.join(', ')}`
    });
    return;
  }

  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    res.status(400).json({
      success: false,
      error: 'El presupuesto "price" debe ser un número positivo en COP'
    });
    return;
  }

  const dto: UpdateEventDto = {
    ...(name && { name: String(name).trim() }),
    ...(category && { category }),
    ...(price !== undefined && { price }),
    ...(capacity !== undefined && { capacity }),
    ...(active !== undefined && { active: Boolean(active) }),
    ...(location && { location: String(location).trim() }),
    ...(date && { date: String(date) })
  };

  const updatedEvent = await eventStore.update(id, dto);

  res.status(200).json({
    success: true,
    message: `Evento '${id}' actualizado exitosamente`,
    data: updatedEvent
  });
});

/**
 * DELETE /api/v1/events/:id
 * Eliminar un evento de la Productora
 */
eventsRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const id = String(req.params.id);
  const removed = await eventStore.remove(id);

  if (!removed) {
    res.status(404).json({
      success: false,
      error: `No fue posible eliminar. El evento con ID '${id}' no existe`
    });
    return;
  }

  // 204 No Content no retorna cuerpo en la respuesta HTTP
  res.status(204).send();
});
