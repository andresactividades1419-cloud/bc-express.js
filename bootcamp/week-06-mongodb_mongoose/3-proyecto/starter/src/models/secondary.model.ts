// ============================================
// MODELO: Entidad Secundaria (sin referencias)
// Adapta el nombre, interfaz y campos a tu dominio
// ============================================
//
// Ejemplos de adaptación:
// - Biblioteca  → Author  (name, nationality, birthYear)
// - Farmacia    → Supplier (name, phone, address)
// - Gimnasio    → Plan (name, maxSessions, price)
// - Restaurante → Category (name, description)
// - Hospital    → Specialty (name, description)

import { Schema, model } from 'mongoose';

// TODO: Renombrar la interfaz según tu dominio (ej. IAuthor, ISupplier, IPlan)
interface ISecondary {
  name: string;
  // TODO: Añadir campos específicos de tu dominio
  // description?: string;
  // phone?: string;
}

// TODO: Renombrar el schema según tu dominio
const secondarySchema = new Schema<ISecondary>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
      maxlength: 100,
      unique: true,
    },
    // TODO: Añadir los campos de tu dominio aquí
    // description: {
    //   type: String,
    //   maxlength: 500,
    // },
  },
  { timestamps: true },
);

// TODO: Renombrar el Model según tu dominio (ej. Author, Supplier, Plan)
// El nombre del Model (singular, PascalCase) determina el nombre de la colección:
// 'Author' → colección 'authors'
export const Secondary = model<ISecondary>('Secondary', secondarySchema);
