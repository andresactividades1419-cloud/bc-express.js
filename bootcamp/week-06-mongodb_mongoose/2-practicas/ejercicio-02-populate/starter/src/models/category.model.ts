import { Schema, model } from 'mongoose';

interface ICategory {
  name: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la categoría es requerido'],
      trim: true,
      maxlength: 100,
      unique: true,
    },
  },
  { timestamps: true },
);

export const Category = model<ICategory>('Category', categorySchema);
