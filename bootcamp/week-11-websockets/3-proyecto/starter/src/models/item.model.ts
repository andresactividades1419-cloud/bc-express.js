import { Schema, model, Document, Types } from 'mongoose';

// ============================================================
// TODO: Adaptar este modelo a tu dominio asignado.
//
// Ejemplos:
//   - Biblioteca  → IBook  { title, author, isbn, genre }
//   - Farmacia    → IDrug  { name, stock, price, category }
//   - Gimnasio    → IRoutine { name, duration, level, exercises }
//   - Restaurante → IDish  { name, price, category, available }
//
// Renombra la interfaz, el modelo y los campos según tu dominio.
// Mantén los campos 'createdBy' y 'createdAt' — son usados
// por el sistema de notificaciones.
// ============================================================

export interface IItem extends Document {
  _id: Schema.Types.ObjectId;
  // TODO: Reemplaza estos campos por los de tu dominio
  name: string;
  description: string;
  // Metadatos requeridos por el sistema de notificaciones
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    // TODO: Adaptar campos a tu dominio
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    // Referencia al usuario que creó el ítem
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

// TODO: Renombra 'Item' por el nombre de tu modelo (ej: 'Book', 'Drug', 'Routine')
export const Item = model<IItem>('Item', itemSchema);
