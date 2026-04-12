import { Router } from 'express';
import * as articleController from '../controllers/article.controller';

const router = Router();

// Paginación por cursor (recomendada para feeds y listas grandes)
router.get('/', articleController.getAllCursor);

// Paginación por offset (para comparar - útil en admin panels)
router.get('/offset', articleController.getAllOffset);

export { router as articleRouter };
