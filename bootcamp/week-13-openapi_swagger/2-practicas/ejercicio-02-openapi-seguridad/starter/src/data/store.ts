// Simple in-memory store with a simulated user for auth

export interface Item {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// Pre-loaded items
let items: Item[] = [
  { id: '1', name: 'Laptop Pro', price: 999.99, stock: 5 },
  { id: '2', name: 'USB-C Hub', price: 29.99, stock: 42 },
  { id: '3', name: 'Keyboard', price: 89.99, stock: 15 },
];

let nextId = 4;

export const itemsStore = {
  findAll() { return items; },
  findById(id: string) { return items.find((i) => i.id === id); },
  create(data: Omit<Item, 'id'>) {
    const item = { id: String(nextId++), ...data };
    items.push(item);
    return item;
  },
  remove(id: string) {
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  },
};

// Single hardcoded user for this exercise (no bcrypt to keep it simple)
export const usersStore = {
  findByEmail(email: string) {
    if (email === 'admin@example.com') {
      return { id: '1', email: 'admin@example.com', password: 'password123' };
    }
    return null;
  },
};
