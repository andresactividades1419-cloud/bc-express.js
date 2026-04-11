import { Product } from '../types';

export type CreateProductRepoDto = Omit<Product, 'id' | 'createdAt'>;
export type UpdateProductRepoDto = Partial<CreateProductRepoDto>;

let products: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299.99, stock: 5, createdAt: new Date() },
  { id: 2, name: 'Mouse Inalámbrico', price: 29.99, stock: 50, createdAt: new Date() },
  { id: 3, name: 'Teclado Mecánico', price: 89.99, stock: 20, createdAt: new Date() },
];

let nextId = 4;

export async function findAll(): Promise<Product[]> {
  return [...products];
}

export async function findById(id: number): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function create(dto: CreateProductRepoDto): Promise<Product> {
  const product: Product = { id: nextId++, ...dto, createdAt: new Date() };
  products.push(product);
  return { ...product };
}

export async function update(id: number, dto: UpdateProductRepoDto): Promise<Product | undefined> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index]!, ...dto };
  return { ...products[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}
