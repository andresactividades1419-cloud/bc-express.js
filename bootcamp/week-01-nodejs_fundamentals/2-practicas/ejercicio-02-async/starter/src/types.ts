// ============================================
// TIPOS COMPARTIDOS — Ejercicio 02
// ============================================

// Interfaz para los usuarios del archivo data/users.json
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  active: boolean;
}

// Interfaz para los products del archivo data/products.json
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}
