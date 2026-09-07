import mongoose, { Document, Schema, Types } from 'mongoose';

export type UserRole = 'user' | 'admin' | 'producer';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'El correo electronico es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contrasena es obligatoria'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'El nombre completo es obligatorio'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'producer'],
      default: 'user',
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
