import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.schema';

// ============================================================
// TODO: Documentar cada endpoint con bloques @openapi
// ============================================================
// Agrega un bloque JSDoc ANTES de cada función export.
// Referencia: 1-teoria/03-documentar-rutas.md
//
// Para register:
//   - POST /api/v1/auth/register
//   - tags: [Auth], security: []
//   - requestBody con $ref: '#/components/schemas/RegisterDto'
//   - responses: 201 (UserProfile), 409 (Error email duplicado)
//
// Para login:
//   - POST /api/v1/auth/login
//   - tags: [Auth], security: []
//   - requestBody con $ref: '#/components/schemas/LoginDto'
//   - responses: 200 (AuthResponse), 401 (Error credenciales inválidas)

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = registerSchema.parse(req.body);
    const user = await authService.register(dto);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = loginSchema.parse(req.body);
    const result = await authService.login(dto);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
