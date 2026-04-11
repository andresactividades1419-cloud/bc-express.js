// ============================================
// MODELO: Entidad Principal (con referencia a la secundaria)
// Adapta el nombre, interfaz y campos a tu dominio
// ============================================
//
// Ejemplos de adaptación:
// - Biblioteca  → Book  (title, isbn, author: ObjectId)
// - Farmacia    → Medicine (name, code, supplier: ObjectId)
// - Gimnasio    → Member (name, email, plan: ObjectId)
// - Restaurante → Dish (name, price, category: ObjectId)
// - Hospital    → Patient (name, dni, doctor: ObjectId)

import { Schema, model, Types } from 'mongoose';

// TODO: Renombrar la interfaz según tu dominio (ej. IBook, IMedicine, IMember)
interface IPrimary {
  name: string;
  // TODO: Añadir campos específicos de tu dominio
  // code?: string;
  // price?: number;
  // active?: boolean;

  // TODO: Cambiar el nombre del campo de referencia según tu dominio
  // (ej. author, supplier, plan, category, doctor)
  secondary: Types.ObjectId;
}

// TODO: Renombrar el schema según tu dominio
const primarySchema = new Schema<IPrimary>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 150,
    },
    // TODO: Añadir campos de tu dominio aquí
    // price: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    // },
    // active: {
    //   type: Boolean,
    //   default: true,
    // },

    // TODO: Renombrar 'secondary' por el nombre del campo de referencia en tu dominio
    // y cambiar ref: 'Secondary' por el nombre del Model secundario
    secondary: {
      type: Schema.Types.ObjectId,
      ref: 'Secondary',
      required: [true, 'La referencia a la entidad secundaria es requerida'],
    },
  },
  { timestamps: true },
);

// TODO: Renombrar el Model según tu dominio (ej. Book, Medicine, Member, Dish)
export const Primary = model<IPrimary>('Primary', primarySchema);
