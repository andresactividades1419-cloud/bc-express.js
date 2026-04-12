// In-memory product store with simulated async latency

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

let products: Product[] = [
  { id: '1', name: 'Laptop Pro', price: 999.99, stock: 5 },
  { id: '2', name: 'USB-C Hub', price: 29.99, stock: 42 },
  { id: '3', name: 'Mechanical Keyboard', price: 89.99, stock: 15 },
  { id: '4', name: 'Wireless Mouse', price: 49.99, stock: 28 },
];

let nextId = 5;

export function findAll(): Product[] {
  return products;
}

export function findById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function create(data: Omit<Product, 'id'>): Product {
  const product = { id: String(nextId++), ...data };
  products.push(product);
  return product;
}

export function remove(id: string): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}
