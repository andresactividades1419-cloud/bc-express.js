import { Schema, model, Document } from 'mongoose';

// ============================================
// TODO: Renombra este modelo a tu recurso del dominio
// ============================================
// Ejemplos:
//   Biblioteca → Book (isbn, title, author, available)
//   Farmacia   → Medicine (sku, name, stock, price)
//   Gimnasio   → Membership (memberCode, plan, startDate, active)
//   Restaurante → Dish (code, name, price, category)
//
// El campo createdBy guarda el ID del usuario que creó el recurso.
// Esto permite que el dueño pueda editar SU recurso
// (pero solo admin puede eliminarlo).

export interface IItem extends Document {
  // TODO: Reemplaza estos campos por los de tu dominio
  name: string;
  description?: string;
  // TODO: Agrega campos específicos de tu dominio
  // isbn?: string;       // Biblioteca
  // sku?: string;        // Farmacia
  // memberCode?: string; // Gimnasio
  active: boolean;
  createdBy: string; // user ID — do NOT remove
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    // TODO: Define los campos de tu dominio aquí
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    // TODO: Agrega los campos específicos de tu dominio
    active: { type: Boolean, default: true },
    createdBy: { type: String, required: true }, // user ID
  },
  { timestamps: true }
);

// TODO: Renombra 'Item' al nombre de tu recurso (ej. 'Book', 'Medicine')
export const Item = model<IItem>('Item', itemSchema);
