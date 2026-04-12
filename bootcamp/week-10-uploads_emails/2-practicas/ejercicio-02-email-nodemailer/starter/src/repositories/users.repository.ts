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

export async function saveResetToken(
  userId: string,
  hashedToken: string,
  expiresAt: Date
): Promise<void> {
  await UserModel.findByIdAndUpdate(userId, {
    resetPasswordToken: hashedToken,
    resetPasswordExpiresAt: expiresAt,
  }).exec();
}

export async function findByResetToken(hashedToken: string): Promise<IUser | null> {
  return UserModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpiresAt: { $gt: new Date() },
  })
    .select('+resetPasswordToken +resetPasswordExpiresAt')
    .exec();
}

export async function clearResetToken(userId: string, newPassword: string): Promise<void> {
  await UserModel.findByIdAndUpdate(userId, {
    password: newPassword,
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
  }).exec();
}
