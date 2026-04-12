import * as usersRepository from '../repositories/users.repository';
import { generateAccessToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';
import type { RegisterDto, LoginDto } from '../validators/auth.schema';

export async function register(dto: RegisterDto) {
  const existing = await usersRepository.findByEmail(dto.email);
  if (existing) throw new AppError(409, 'El email ya está registrado');

  const user = await usersRepository.createUser(dto);
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
    user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
  };
}

export async function login(dto: LoginDto) {
  const user = await usersRepository.findByEmail(dto.email);
  if (!user) throw new AppError(401, 'Credenciales inválidas');

  const valid = await user.comparePassword(dto.password);
  if (!valid) throw new AppError(401, 'Credenciales inválidas');

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
    user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
  };
}
