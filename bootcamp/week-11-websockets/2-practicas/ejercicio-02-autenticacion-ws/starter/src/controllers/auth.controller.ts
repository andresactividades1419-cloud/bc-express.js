import { Request, Response, NextFunction } from 'express';
import { usersStore } from '../data/users.store';
import { generateAccessToken } from '../utils/jwt';
import { registerSchema, loginSchema } from '../validators/auth.schema';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = registerSchema.parse(req.body);

    const existing = usersStore.findByEmail(dto.email);
    if (existing) {
      res.status(409).json({ error: 'El email ya está registrado' });
      return;
    }

    const user = await usersStore.create(dto);
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });

    res.status(201).json({
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = loginSchema.parse(req.body);

    const user = usersStore.findByEmail(dto.email);
    if (!user) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const valid = await usersStore.verifyPassword(dto.password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });

    res.json({
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    next(error);
  }
}
