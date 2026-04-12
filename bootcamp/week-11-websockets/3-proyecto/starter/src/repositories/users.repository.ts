import { User, IUser } from '../models/user.model';
import type { RegisterDto } from '../validators/auth.schema';
import bcrypt from 'bcrypt';

export async function createUser(dto: RegisterDto): Promise<IUser> {
  const passwordHash = await bcrypt.hash(dto.password, 10);
  return User.create({ email: dto.email, passwordHash, name: dto.name });
}

export async function findByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email: email.toLowerCase() });
}
