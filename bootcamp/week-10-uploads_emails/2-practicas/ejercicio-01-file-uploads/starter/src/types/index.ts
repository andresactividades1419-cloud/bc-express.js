// src/types/index.ts
import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}
