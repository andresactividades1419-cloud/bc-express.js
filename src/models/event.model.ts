import { Schema, model, Document } from 'mongoose';

// ============================================
// Recurso principal — Dominio: Productora de Eventos
// ============================================
// createdBy guarda el ID del usuario (productor) que creó el evento.
// Esto permite que el dueño pueda editar SU evento, pero solo un admin
// puede eliminarlo.

export const EVENT_CATEGORIES = [
  'concierto',
  'boda',
  'conferencia',
  'corporativo',
  'festival',
  'exposicion',
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface IEvent extends Document {
  name: string;
  code: string;
  category: EventCategory;
  price: number;
  capacity: number;
  active: boolean;
  location: string;
  date: Date;
  createdBy: string; // user ID — no eliminar
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    code: { type: String, required: true, unique: true, trim: true, uppercase: true, maxlength: 30 },
    category: { type: String, required: true, enum: EVENT_CATEGORIES },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, default: 100, min: 0 },
    active: { type: Boolean, default: true },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    date: { type: Date, required: true },
    createdBy: { type: String, required: true }, // user ID
  },
  { timestamps: true }
);

export const Event = model<IEvent>('Event', eventSchema);
