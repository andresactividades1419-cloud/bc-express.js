import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { registerSchema, loginSchema } from '../validators/auth.schema';

export const authRouter = Router();

// POST /api/v1/auth/register
authRouter.post('/register', validate(registerSchema), authController.register);

// POST /api/v1/auth/login
authRouter.post('/login', validate(loginSchema), authController.login);

// POST /api/v1/auth/refresh — reads refresh token from HttpOnly cookie
authRouter.post('/refresh', authController.refresh);

// POST /api/v1/auth/logout — requires valid access token
authRouter.post('/logout', authenticate, authController.logout);
