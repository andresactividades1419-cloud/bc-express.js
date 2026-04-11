// src/services/items.service.ts — Lógica de negocio
// ============================================================
// TODO: Implementar el servicio que delega al repositorio
//
// Lineamientos:
//   - Importar las funciones del repositorio: import * as repo from '../repositories/items.repository'
//   - listItems(page, limit): delegar a repo.findAll
//   - getItem(id): llamar repo.findById, si es null lanzar AppError(404)
//   - createItem(data): delegar a repo.create
//   - updateItem(id, data): delegar a repo.update
//   - deleteItem(id): delegar a repo.remove
//
// Aquí puedes añadir lógica de negocio adicional:
//   - Formatear datos antes de retornar
//   - Validaciones adicionales (ej. verificar que la categoría existe antes de crear)
//   - Transformaciones específicas del dominio
// ============================================================
