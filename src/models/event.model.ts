import mongoose, { Schema, Document } from 'mongoose';
import type { EventCategory } from '../types/index.js';

// ============================================================
// MODELO DE EVENTO — Dominio: Productora de Eventos
// ============================================================

export const EVENT_CATEGORIES: EventCategory[] = [
  'concierto',
  'boda',
  'conferencia',
  'corporativo',
  'festival',
  'exposicion',
];

export interface IEvent extends Document {
  name: string;
  code: string;
  category: EventCategory;
  price: number;
  capacity: number;
  location: string;
  date: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    code: { type: String, required: true, unique: true, trim: true, uppercase: true, maxlength: 30 },
    category: { type: String, required: true, enum: EVENT_CATEGORIES },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

export const EventModel = mongoose.model<IEvent>('Event', EventSchema);
