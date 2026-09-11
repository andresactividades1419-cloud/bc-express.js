import bcrypt from 'bcrypt';
import { usersRepository } from '../repositories/users.repository.js';
import { RegisterDto, LoginDto } from '../schemas/auth.schema.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from '../utils/jwt.js';
import { AppError } from '../errors/AppError.js';

export class AuthService {
  private readonly saltRounds = 10;

  async register(input: RegisterDto) {
    const existing = await usersRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError(409, 'El correo electronico ya esta registrado');
    }

    const hashedPassword = await bcrypt.hash(input.password, this.saltRounds);

    // El rol nunca se toma del cuerpo de la peticion: el schema de Mongoose
    // (user.model.ts) asigna 'user' por defecto. Asignar 'admin' o
    // 'producer' es una operacion administrativa, no algo que un
    // usuario anonimo pueda elegir por si mismo.
    const user = await usersRepository.create({
      name: input.name,
      email: input.email.toLowerCase(),
      password: hashedPassword
    });

    const tokens = this.generateTokens(user._id.toString(), user.email, user.role);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, this.saltRounds);

    await usersRepository.updateRefreshToken(user._id.toString(), hashedRefreshToken);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      },
      tokens
    };
  }

  async login(input: LoginDto) {
    const user = await usersRepository.findByEmailWithPassword(input.email.toLowerCase());
    if (!user) {
      throw new AppError(401, 'Credenciales invalidas');
    }

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) {
      throw new AppError(401, 'Credenciales invalidas');
    }

    const tokens = this.generateTokens(user._id.toString(), user.email, user.role);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, this.saltRounds);

    await usersRepository.updateRefreshToken(user._id.toString(), hashedRefreshToken);

    return {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      },
      tokens
    };
  }

  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(401, 'Token de refresco invalido o expirado');
    }

    const user = await usersRepository.findByIdWithTokens(payload.sub);
    if (!user || !user.refreshToken) {
      throw new AppError(401, 'Acceso no autorizado');
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      // Posible reuso de token: revocar token de refresco
      await usersRepository.updateRefreshToken(user._id.toString(), null);
      throw new AppError(401, 'Token de refresco revocado o invalido');
    }

    const tokens = this.generateTokens(user._id.toString(), user.email, user.role);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, this.saltRounds);

    await usersRepository.updateRefreshToken(user._id.toString(), hashedRefreshToken);

    return { tokens };
  }

  async logout(userId: string) {
    await usersRepository.updateRefreshToken(userId, null);
  }

  async getMe(userId: string) {
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError(404, 'Usuario no encontrado');
    }
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  private generateTokens(sub: string, email: string, role: string) {
    const accessToken = signAccessToken({ sub, email, role });
    const refreshToken = signRefreshToken({ sub, email, role });
    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
