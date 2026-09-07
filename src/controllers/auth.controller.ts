import { Request, Response, NextFunction, CookieOptions } from 'express';
import { authService } from '../services/auth.service.js';
import { AppError } from '../errors/AppError.js';

const isProduction = process.env.NODE_ENV === 'production';

const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000, // 15 minutos
  path: '/'
};

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
  path: '/api/v1/auth'
};

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.register(req.body);

      res.cookie('accessToken', result.tokens.accessToken, accessCookieOptions);
      res.cookie('refreshToken', result.tokens.refreshToken, refreshCookieOptions);

      res.status(201).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);

      res.cookie('accessToken', result.tokens.accessToken, accessCookieOptions);
      res.cookie('refreshToken', result.tokens.refreshToken, refreshCookieOptions);

      res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.refreshToken || req.body?.refreshToken;
      if (!token) {
        throw new AppError(401, 'Token de refresco requerido');
      }

      const result = await authService.refresh(token);

      res.cookie('accessToken', result.tokens.accessToken, accessCookieOptions);
      res.cookie('refreshToken', result.tokens.refreshToken, refreshCookieOptions);

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.tokens.accessToken
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.user?.sub) {
        await authService.logout(req.user.sub);
      }

      res.clearCookie('accessToken', { path: '/' });
      res.clearCookie('refreshToken', { path: '/api/v1/auth' });

      res.status(200).json({
        success: true,
        message: 'Sesion cerrada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.sub) {
        throw new AppError(401, 'No autenticado');
      }

      const user = await authService.getMe(req.user.sub);

      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
