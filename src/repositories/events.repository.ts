// ============================================
// REPOSITORY — Capa de acceso a datos
// ============================================
// Reglas de esta capa:
// - Único punto de acceso al store en memoria
// - Todos los métodos deben ser async Promise<T>
// - Retorna copias defensivas para evitar mutaciones externas
// - Si no encuentra un elemento, retorna undefined

import { Event, CreateEventDto, UpdateEventDto } from '../types';

const store: Event[] = [
  {
    id: 1,
    name: 'Festival Estéreo Picnic 2026',
    category: 'festival',
    price: 185000000,
    capacity: 45000,
    active: true,
    location: 'Parque Simón Bolívar, Bogotá',
    date: '2026-03-27T14:00:00.000Z',
    createdAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Concierto Filarmónica de Bogotá',
    category: 'concierto',
    price: 65000000,
    capacity: 1500,
    active: true,
    location: 'Teatro Mayor Julio Mario Santo Domingo, Bogotá',
    date: '2026-04-15T20:00:00.000Z',
    createdAt: '2026-01-12T11:30:00.000Z',
  },
  {
    id: 3,
    name: 'Boda Campestre Los Rosales',
    category: 'boda',
    price: 32000000,
    capacity: 180,
    active: true,
    location: 'Hacienda El Cedro, Llanogrande, Antioquia',
    date: '2026-05-02T16:00:00.000Z',
    createdAt: '2026-01-15T15:00:00.000Z',
  },
  {
    id: 4,
    name: 'Cumbre Latinoamericana de Inteligencia Artificial',
    category: 'conferencia',
    price: 120000000,
    capacity: 2500,
    active: true,
    location: 'Centro de Convenciones Ágora, Bogotá',
    date: '2026-06-18T08:30:00.000Z',
    createdAt: '2026-01-20T09:00:00.000Z',
  },
  {
    id: 5,
    name: 'Gala Anual Corporativa Grupo Éxito',
    category: 'corporativo',
    price: 55000000,
    capacity: 600,
    active: false,
    location: 'Hotel Intercontinental, Medellín',
    date: '2026-07-10T19:30:00.000Z',
    createdAt: '2026-01-25T14:20:00.000Z',
  },
  {
    id: 6,
    name: 'Expo Agroindustrial del Eje Cafetero',
    category: 'exposicion',
    price: 78000000,
    capacity: 5000,
    active: true,
    location: 'Expofuturo, Pereira',
    date: '2026-08-22T09:00:00.000Z',
    createdAt: '2026-02-01T08:00:00.000Z',
  },
];

let nextId = 7;

export async function findAll(): Promise<Event[]> {
  return store.map((item) => ({ ...item }));
}

export async function findById(id: number): Promise<Event | undefined> {
  const item = store.find((event) => event.id === id);
  return item ? { ...item } : undefined;
}

export async function create(dto: CreateEventDto): Promise<Event> {
  const item: Event = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString(),
  };
  store.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdateEventDto): Promise<Event | undefined> {
  const index = store.findIndex((event) => event.id === id);
  if (index === -1) {
    return undefined;
  }

  store[index] = {
    ...store[index]!,
    ...dto,
    id: store[index]!.id,
    createdAt: store[index]!.createdAt,
  };

  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((event) => event.id === id);
  if (index === -1) {
    return false;
  }
  store.splice(index, 1);
  return true;
}
