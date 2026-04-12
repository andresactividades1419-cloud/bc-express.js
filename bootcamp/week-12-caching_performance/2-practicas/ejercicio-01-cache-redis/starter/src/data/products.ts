// Datos en memoria — simula una base de datos lenta
// En producción esto vendría de PostgreSQL/MongoDB con latencia real

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

// Simula latencia de 80ms en cada lectura (como una DB real)
async function simulateDbLatency(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 80));
}

let products: Product[] = [
  { id: '1', name: 'Laptop Pro', price: 1299.99, category: 'electronics', createdAt: new Date().toISOString() },
  { id: '2', name: 'Wireless Mouse', price: 29.99, category: 'electronics', createdAt: new Date().toISOString() },
  { id: '3', name: 'Mechanical Keyboard', price: 89.99, category: 'electronics', createdAt: new Date().toISOString() },
  { id: '4', name: 'USB-C Hub', price: 49.99, category: 'accessories', createdAt: new Date().toISOString() },
  { id: '5', name: 'Monitor 4K', price: 599.99, category: 'electronics', createdAt: new Date().toISOString() },
];

export const productStore = {
  async findAll(): Promise<Product[]> {
    await simulateDbLatency();
    return [...products];
  },

  async findById(id: string): Promise<Product | undefined> {
    await simulateDbLatency();
    return products.find((p) => p.id === id);
  },

  async create(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await simulateDbLatency();
    const product: Product = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date().toISOString(),
    };
    products.push(product);
    return product;
  },

  async remove(id: string): Promise<boolean> {
    await simulateDbLatency();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  },
};
