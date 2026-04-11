// ============================================
// REPOSITORY — acceso a datos (listo)
// ============================================
import { Product } from '../types';

const store: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299.99, stock: 10, createdAt: new Date().toISOString() },
  { id: 2, name: 'Mouse Inalámbrico', price: 29.99, stock: 50, createdAt: new Date().toISOString() },
  { id: 3, name: 'Teclado Mecánico', price: 89.99, stock: 25, createdAt: new Date().toISOString() },
];
let nextId = 4;

export type CreateProductRepoDto = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductRepoDto = Partial<CreateProductRepoDto>;

export async function findAll(): Promise<Product[]> {
  return [...store];
}

export async function findById(id: number): Promise<Product | undefined> {
  return store.find((p) => p.id === id);
}

export async function create(dto: CreateProductRepoDto): Promise<Product> {
  const product: Product = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(product);
  return { ...product };
}

export async function update(id: number, dto: UpdateProductRepoDto): Promise<Product | undefined> {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
