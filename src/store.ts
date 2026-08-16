import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Event, CreateEventDto, UpdateEventDto, EventQueryParams } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'events.json');

class EventStore {
  private events: Event[] = [];
  private currentIdCounter = 1;

  constructor() {
    this.init();
  }

  /**
   * Carga inicial síncrona/asíncrona del catálogo de eventos desde data/events.json
   */
  private async init(): Promise<void> {
    try {
      const rawData = await fs.readFile(DATA_FILE, 'utf-8');
      this.events = JSON.parse(rawData);
      this.calculateMaxId();
    } catch {
      // Si el archivo no se encuentra o falla, inicializamos con catálogo por defecto
      this.events = [
        {
          id: 'EVT-001',
          name: 'Concierto Vallenato VIP Silvestre Dangond',
          category: 'concierto',
          price: 45000000,
          capacity: 5000,
          active: true,
          location: 'Movistar Arena, Bogotá',
          date: '2026-04-15T20:00:00.000Z'
        }
      ];
      this.calculateMaxId();
    }
  }

  private calculateMaxId(): void {
    const ids = this.events
      .map((e) => {
        const num = parseInt(e.id.replace('EVT-', ''), 10);
        return isNaN(num) ? 0 : num;
      });
    const max = Math.max(...ids, 0);
    this.currentIdCounter = max + 1;
  }

  private generateId(): string {
    const nextId = `EVT-${String(this.currentIdCounter).padStart(3, '0')}`;
    this.currentIdCounter++;
    return nextId;
  }

  /**
   * Retorna todos los eventos con filtrado opcional por categoría, estado o término de búsqueda
   */
  async getAll(params?: EventQueryParams): Promise<Event[]> {
    let result = [...this.events];

    if (params?.category) {
      result = result.filter(
        (e) => e.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    if (params?.active !== undefined) {
      result = result.filter((e) => e.active === params.active);
    }

    if (params?.search) {
      const term = params.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(term) ||
          e.location.toLowerCase().includes(term)
      );
    }

    return result;
  }

  /**
   * Obtiene un evento por su identificador único ID
   */
  async getById(id: string): Promise<Event | undefined> {
    return this.events.find((e) => e.id.toUpperCase() === id.toUpperCase());
  }

  /**
   * Registra un nuevo evento en la Productora
   */
  async create(dto: CreateEventDto): Promise<Event> {
    const newEvent: Event = {
      id: this.generateId(),
      ...dto
    };
    this.events.push(newEvent);
    return newEvent;
  }

  /**
   * Actualiza los datos de un evento existente
   */
  async update(id: string, dto: UpdateEventDto): Promise<Event | undefined> {
    const index = this.events.findIndex((e) => e.id.toUpperCase() === id.toUpperCase());
    if (index === -1) {
      return undefined;
    }

    const updatedEvent: Event = {
      ...this.events[index],
      ...dto,
      id: this.events[index].id // Preservamos el ID original sin mutar
    };

    this.events[index] = updatedEvent;
    return updatedEvent;
  }

  /**
   * Elimina un evento de la Productora
   */
  async remove(id: string): Promise<boolean> {
    const index = this.events.findIndex((e) => e.id.toUpperCase() === id.toUpperCase());
    if (index === -1) {
      return false;
    }

    this.events.splice(index, 1);
    return true;
  }
}

export const eventStore = new EventStore();
