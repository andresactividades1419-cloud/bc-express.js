import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { usersRepository } from '../repositories/users.repository';
import { RegisterDto, LoginDto } from '../validators/auth.schema';
import { AppError } from '../errors/AppError';

export const authService = {
  async register(dto: RegisterDto) {
    const existing = await usersRepository.findByEmail(dto.email);
    if (existing) throw new AppError(409, 'Email ya registrado');

    const hashed = await bcrypt.hash(dto.password, 12);
    const user = await usersRepository.create({ ...dto, password: hashed });
    const { password: _, ...userSafe } = user;
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return { user: userSafe, token };
  },

  async login(dto: LoginDto) {
    const user = await usersRepository.findByEmail(dto.email);
    if (!user) throw new AppError(401, 'Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new AppError(401, 'Credenciales inválidas');

    const { password: _, ...userSafe } = user;
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return { user: userSafe, token };
  },
};
