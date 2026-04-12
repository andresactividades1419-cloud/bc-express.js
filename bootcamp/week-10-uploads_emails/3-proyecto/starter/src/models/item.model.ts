// src/models/item.model.ts
// Recurso principal del dominio. Adapta los campos a tu contexto:
//   Biblioteca → libro (title, author, genre, coverUrl, coverPublicId)
//   Farmacia   → producto (name, category, price, imageUrl, imagePublicId)
//   Gimnasio   → rutina (name, level, description, imageUrl, imagePublicId)
import mongoose, { Document, Schema } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  imagePublicId?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Item = mongoose.model<IItem>('Item', itemSchema);
