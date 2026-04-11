// src/controllers/items.controller.ts — Capa HTTP
// ============================================================
// TODO: Implementar los handlers del controlador
//
// Lineamientos:
//   - Cada función: async (req, res, next) => try { ... } catch (err) { next(err); }
//   - getAll:  extraer page/limit de req.query, llamar service.listItems, res.json()
//   - getById: extraer id de req.params, llamar service.getItem, res.json()
//   - create:  validar con createItemSchema.safeParse(req.body), res.status(201).json()
//   - update:  validar con updateItemSchema.safeParse(req.body), res.json()
//   - remove:  llamar service.deleteItem, res.status(204).send()
//
// Recuerda:
//   - Validar que page/limit sean números enteros positivos (Math.max, Math.min)
//   - Si safeParse falla → res.status(400).json({ status: 'error', message: ... })
//   - No manejar AppError aquí — el errorHandler global lo hace
// ============================================================
