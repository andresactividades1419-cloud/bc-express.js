// src/repositories/users.repository.ts
import { UserModel, IUser } from '../models/user.model';

export async function findById(id: string): Promise<IUser | null> {
  return UserModel.findById(id).exec();
}

export async function findByEmail(email: string): Promise<IUser | null> {
  return UserModel.findOne({ email }).exec();
}

export async function create(data: {
  name: string;
  email: string;
  password: string;
}): Promise<IUser> {
  return UserModel.create(data);
}

export async function updateAvatar(
  id: string,
  avatarUrl: string,
  avatarPublicId: string
): Promise<IUser | null> {
  return UserModel.findByIdAndUpdate(
    id,
    { avatarUrl, avatarPublicId },
    { new: true }
  ).exec();
}
