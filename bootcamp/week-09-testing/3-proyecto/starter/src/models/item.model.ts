import mongoose, { Schema, Document } from 'mongoose';

// ============================================================
// MODELO DE ITEM — adaptar al dominio asignado
// ============================================================
// Ejemplos:
//   Biblioteca  → Book (title, isbn, authorId, available)
//   Farmacia    → Medicine (name, activeIngredient, stock, requiresPrescription)
//   Gimnasio    → Member (fullName, plan, startDate, active)
// ============================================================

export interface IItem extends Document {
  // TODO: Adaptar los campos al dominio asignado
  name:        string;
  description: string;
  createdBy:   string;
  createdAt:   Date;
  updatedAt:   Date;
}

const ItemSchema = new Schema<IItem>(
  {
    // TODO: Adaptar los campos al dominio asignado
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    createdBy:   { type: String, required: true },
  },
  { timestamps: true },
);

export const ItemModel = mongoose.model<IItem>('Item', ItemSchema);
