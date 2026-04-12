// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  // Campos para reset de contraseña
  resetPasswordToken?: string;   // Token hasheado (nunca en claro)
  resetPasswordExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpiresAt: { type: Date, select: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
