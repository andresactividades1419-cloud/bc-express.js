import { Router } from 'express';
import { authRouter } from './auth.routes';
import { resourceRouter } from './resource.routes';

export const router = Router();

// Auth endpoints — no prefix needed, already scoped under /api/v1/auth
router.use('/auth', authRouter);

// Domain resource endpoints
// TODO: Rename /resources to your domain entity (e.g., /books, /medicines, /members)
router.use('/resources', resourceRouter);
