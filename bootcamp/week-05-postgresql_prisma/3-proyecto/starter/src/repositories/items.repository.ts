// src/repositories/items.repository.ts — Acceso a datos con Prisma
// ============================================================
// TODO: Implementar el repositorio CRUD para tu recurso principal
//
// Lineamientos:
//   - Importar prisma desde '../lib/prisma'
//   - Importar PrismaClientKnownRequestError desde '@prisma/client/runtime/library'
//   - Importar AppError desde '../errors/AppError'
//   - Adaptar el nombre del modelo Prisma (prisma.item → prisma.book, prisma.medication, etc.)
//
// Funciones requeridas:
//
// findAll(page, limit) → Promise<{ data: Item[], total: number, page: number, limit: number }>
//   - Usar Promise.all con findMany (skip/take) y count()
//   - Incluir el recurso secundario con include: { secondaryModel: true } (si aplica)
//   - orderBy: { createdAt: 'desc' }
//
// findById(id) → Promise<Item | null>
//   - Usar findUnique con where: { id }
//   - Incluir recurso secundario con include
//   - Retorna null si no existe (el servicio lanza AppError 404)
//
// create(data) → Promise<Item>
//   - Usar prisma.model.create({ data })
//   - Capturar P2002 → AppError(409, 'Ya existe un [nombre] con ese valor')
//
// update(id, data) → Promise<Item>
//   - Usar prisma.model.update({ where: { id }, data })
//   - Capturar P2025 → AppError(404, '[Nombre] no encontrado')
//
// remove(id) → Promise<void>
//   - Usar prisma.model.delete({ where: { id } })
//   - Capturar P2025 → AppError(404, '[Nombre] no encontrado')
// ============================================================
