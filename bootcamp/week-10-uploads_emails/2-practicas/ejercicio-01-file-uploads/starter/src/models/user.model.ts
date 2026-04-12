// src/models/user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatarUrl?: string;
  avatarPublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatarUrl: { type: String },
    avatarPublicId: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
