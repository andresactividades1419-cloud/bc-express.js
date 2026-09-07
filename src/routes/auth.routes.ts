import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), (req, res, next) => {
  authController.register(req, res, next);
});

authRouter.post('/login', validateBody(loginSchema), (req, res, next) => {
  authController.login(req, res, next);
});

authRouter.post('/refresh', (req, res, next) => {
  authController.refresh(req, res, next);
});

authRouter.post('/logout', authenticate, (req, res, next) => {
  authController.logout(req, res, next);
});

authRouter.get('/me', authenticate, (req, res, next) => {
  authController.me(req, res, next);
});
