// ============================================================
// UNIT TESTS — items.service.ts
// ============================================================
// Mockear items.repository — testear la lógica de negocio pura
// Adaptar las pruebas al dominio asignado
// ============================================================

// jest.mock('../repositories/items.repository');
//
// import * as itemsRepo from '../repositories/items.repository';
// import * as itemsService from '../services/items.service';
//
// const mockFindAll    = itemsRepo.findAllItems   as jest.MockedFunction<typeof itemsRepo.findAllItems>;
// const mockFindById   = itemsRepo.findItemById   as jest.MockedFunction<typeof itemsRepo.findItemById>;
// const mockCreate     = itemsRepo.createItem     as jest.MockedFunction<typeof itemsRepo.createItem>;
// const mockUpdate     = itemsRepo.updateItem     as jest.MockedFunction<typeof itemsRepo.updateItem>;
// const mockDelete     = itemsRepo.deleteItem     as jest.MockedFunction<typeof itemsRepo.deleteItem>;

// const itemBase = {
//   _id: 'item-id-123',
//   name: 'Item de prueba',
//   description: 'Descripción del item',
//   createdBy: 'user-id-abc',
//   createdAt: new Date(),
//   updatedAt: new Date(),
// };

describe('ItemsService — Unit Tests', () => {
  // TODO: Adaptar al dominio asignado

  describe('getAll()', () => {
    // TODO: Testear listado vacío y con items
    // it('should return all items', async () => { ... });
    // it('should return empty array when no items exist', async () => { ... });
  });

  describe('getById()', () => {
    // TODO: Testear happy path y 404
    // it('should return the item when found', async () => { ... });
    // it('should throw AppError 404 when item does not exist', async () => { ... });
  });

  describe('create()', () => {
    // TODO: Testear creación exitosa
    // it('should create and return the new item', async () => { ... });
  });

  describe('update()', () => {
    // TODO: Testear actualización exitosa y 404 y 403
    // it('should update and return the item when requester is the owner', async () => { ... });
    // it('should throw AppError 403 when requester is not the owner', async () => { ... });
    // it('should throw AppError 404 when item does not exist', async () => { ... });
  });

  describe('remove()', () => {
    // TODO: Testear eliminación exitosa y 404 y 403
    // it('should delete the item when requester is admin', async () => { ... });
    // it('should throw AppError 403 when requester is not owner or admin', async () => { ... });
    // it('should throw AppError 404 when item does not exist', async () => { ... });
  });
});

export {};
