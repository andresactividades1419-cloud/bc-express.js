import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { usersRepository } from '../repositories/users.repository';
import { env } from '../config/env';
import { RegisterDto, LoginDto } from '../validators/auth.schema';

export const authService = {
  async register(dto: RegisterDto) {
    const exists = await usersRepository.findByEmail(dto.email);
    if (exists) throw new AppError(409, 'Email already registered');
    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await usersRepository.create({ ...dto, password: hashed });
    const { password: _pw, ...profile } = user;
    return profile;
  },

  async login(dto: LoginDto) {
    const user = await usersRepository.findByEmail(dto.email);
    if (!user) throw new AppError(401, 'Invalid credentials');
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new AppError(401, 'Invalid credentials');
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN },
    );
    return { accessToken };
  },
};
