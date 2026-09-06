import { Schema, model, Types, Document } from 'mongoose';

export const EVENT_CATEGORIES = [
  'concierto',
  'boda',
  'conferencia',
  'corporativo',
  'festival',
  'exposicion',
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface IEvent {
  name: string;
  code: string;
  category: EventCategory;
  price: number;
  capacity: number;
  active: boolean;
  location: string;
  date: Date;
  client: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type EventDocument = IEvent & Document;

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del evento es obligatorio'],
      trim: true,
      maxlength: [150, 'El nombre no puede exceder 150 caracteres'],
    },
    code: {
      type: String,
      required: [true, 'El código del evento es obligatorio'],
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: [30, 'El código no puede exceder 30 caracteres'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: {
        values: EVENT_CATEGORIES,
        message: 'Categoría no válida. Permitidas: {VALUES}',
      },
    },
    price: {
      type: Number,
      required: [true, 'El presupuesto asignado en COP es obligatorio'],
      min: [0, 'El presupuesto no puede ser negativo'],
    },
    capacity: {
      type: Number,
      default: 100,
      min: [0, 'El aforo no puede ser negativo'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      required: [true, 'La locación es obligatoria'],
      trim: true,
      maxlength: [200, 'La locación no puede exceder 200 caracteres'],
    },
    date: {
      type: Date,
      required: [true, 'La fecha del evento es obligatoria'],
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'La referencia al cliente (client) es obligatoria'],
    },
  },
  {
    timestamps: true,
  }
);

export const Event = model<IEvent>('Event', eventSchema);
