import { Schema, model, Document } from 'mongoose';

export interface IClient {
  name: string;
  email: string;
  phone: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ClientDocument = IClient & Document;

const clientSchema = new Schema<IClient>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del cliente es obligatorio'],
      trim: true,
      maxlength: [120, 'El nombre no puede exceder 120 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'El teléfono de contacto es obligatorio'],
      trim: true,
      maxlength: [25, 'El teléfono no puede exceder 25 caracteres'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [150, 'La empresa no puede exceder 150 caracteres'],
    },
  },
  {
    timestamps: true,
  }
);

export const Client = model<IClient>('Client', clientSchema);
