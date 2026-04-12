import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../errors/app-error';
import type { RegisterDto, LoginDto } from '../validators/auth.schema';

const SALT_ROUNDS = 12;

// Registers a new user and returns tokens on success.
export async function register(dto: RegisterDto) {
  const exists = await prisma.user.findUnique({ where: { email: dto.email } });
  if (exists) throw new AppError(409, 'Email already in use');

  const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { email: dto.email, password: hashedPassword, name: dto.name },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

  // Store hashed refresh token — if the DB is compromised, raw tokens are safe
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: await bcrypt.hash(refreshToken, 10) },
  });

  return { user, accessToken, refreshToken };
}

// Verifies credentials and returns tokens on success.
export async function login(dto: LoginDto) {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  // Same error for "user not found" and "wrong password" — prevents user enumeration
  if (!user) throw new AppError(401, 'Invalid credentials');

  const valid = await bcrypt.compare(dto.password, user.password);
  if (!valid) throw new AppError(401, 'Invalid credentials');

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: await bcrypt.hash(refreshToken, 10) },
  });

  const { password: _, refreshToken: __, ...userWithoutSecrets } = user;
  return { user: userWithoutSecrets, accessToken, refreshToken };
}

// Refreshes the access token using a valid refresh token.
export async function refresh(token: string) {
  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    throw new AppError(401, 'Invalid or expired refresh token');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user?.refreshToken) throw new AppError(401, 'Invalid refresh token');

  const valid = await bcrypt.compare(token, user.refreshToken);
  if (!valid) throw new AppError(401, 'Invalid refresh token');

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  return { accessToken };
}

// Invalidates the refresh token for the given user (logout).
export async function logout(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
}
