// ============================================
// REPOSITORY — Acceso a datos en memoria
// ============================================
import { Event } from '../types';
import { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export type CreateEventRepoDto = CreateEventDto;
export type UpdateEventRepoDto = UpdateEventDto;

let events: Event[] = [
  {
    id: 1,
    name: 'Festival Estéreo Picnic 2026',
    category: 'festival',
    price: 185000000,
    capacity: 45000,
    active: true,
    location: 'Parque Simón Bolívar, Bogotá',
    date: '2026-03-27T14:00:00.000Z',
    createdAt: new Date('2026-01-10T10:00:00.000Z'),
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
    createdAt: new Date('2026-01-12T11:30:00.000Z'),
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
    createdAt: new Date('2026-01-15T15:00:00.000Z'),
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
    createdAt: new Date('2026-01-20T09:00:00.000Z'),
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
    createdAt: new Date('2026-01-25T14:20:00.000Z'),
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
    createdAt: new Date('2026-02-01T08:00:00.000Z'),
  },
];

let nextId = 7;

export async function findAll(): Promise<Event[]> {
  return events.map((event) => ({ ...event }));
}

export async function findById(id: number): Promise<Event | undefined> {
  const item = events.find((e) => e.id === id);
  return item ? { ...item } : undefined;
}

export async function create(dto: CreateEventRepoDto): Promise<Event> {
  const item: Event = {
    id: nextId++,
    ...dto,
    createdAt: new Date(),
  };
  events.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdateEventRepoDto): Promise<Event | undefined> {
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return undefined;

  events[index] = {
    ...events[index]!,
    ...dto,
    id: events[index]!.id,
    createdAt: events[index]!.createdAt,
  };
  return { ...events[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return false;

  events.splice(index, 1);
  return true;
}
