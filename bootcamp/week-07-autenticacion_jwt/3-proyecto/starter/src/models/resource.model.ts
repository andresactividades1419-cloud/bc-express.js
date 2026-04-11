import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// MODELO DEL RECURSO PRINCIPAL
// ============================================
// INSTRUCCIONES:
//
// 1. Cambia el nombre de este archivo al recurso real de tu dominio.
//    Ejemplos: book.model.ts, medication.model.ts, member.model.ts
//
// 2. Reemplaza la interfaz IResource con los campos de tu recurso.
//    Elimina los campos de ejemplo y agrega los propios.
//
// 3. Renombra el model al final: mongoose.model<IBook>('Book', bookSchema)
//
// 4. Actualiza las importaciones en repository, service, controller y routes.
// ============================================

// TODO: Reemplaza IResource con la interfaz real de tu recurso
// Ejemplo para Biblioteca:
//   export interface IBook extends Document {
//     title: string;
//     author: string;
//     isbn: string;
//     available: boolean;
//     createdBy: mongoose.Types.ObjectId;
//   }
export interface IResource extends Document {
  // TODO: Define los campos de tu recurso
  // name: string;
  // description?: string;
  // active: boolean;
  // createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Define el schema de Mongoose con los campos correctos
const resourceSchema = new Schema<IResource>(
  {
    // TODO: Agrega los campos de tu recurso aquí
    // name: {
    //   type: String,
    //   required: [true, 'El nombre es requerido'],
    //   trim: true,
    // },
    // description: {
    //   type: String,
    //   trim: true,
    // },
    // active: {
    //   type: Boolean,
    //   default: true,
    // },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  { timestamps: true }
);

// TODO: Renombra 'Resource' por el nombre real de tu modelo (singular, PascalCase)
// Ejemplo: mongoose.model<IBook>('Book', bookSchema)
export const ResourceModel = mongoose.model<IResource>('Resource', resourceSchema);
