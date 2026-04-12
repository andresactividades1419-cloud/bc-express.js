import { Router } from 'express';
import * as itemController from '../controllers/item.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

// ── Auth router ──────────────────────────────────────────────────────────────

export const authRouter = Router();

// /**
//  * @openapi
//  * /api/v1/auth/login:
//  *   post:
//  *     tags: [Auth]
//  *     summary: Login and get a JWT token
//  *     security: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/LoginDto'
//  *     responses:
//  *       200:
//  *         description: JWT token
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token: { type: string, example: "eyJhbGciOiJIUzI1NiIs..." }
//  *       401:
//  *         description: Invalid credentials
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */
authRouter.post('/login', itemController.login);

// ── Items router ─────────────────────────────────────────────────────────────

export const itemRouter = Router();

// /**
//  * @openapi
//  * /api/v1/items:
//  *   get:
//  *     tags: [Items]
//  *     summary: List all items
//  *     security: []
//  *     responses:
//  *       200:
//  *         description: Array of items
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Item'
//  */
itemRouter.get('/', itemController.getAll);

// /**
//  * @openapi
//  * /api/v1/items/{id}:
//  *   get:
//  *     tags: [Items]
//  *     summary: Get item by ID
//  *     security: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Item found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Item'
//  *       404:
//  *         description: Item not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */
itemRouter.get('/:id', itemController.getById);

// ============================================================
// PASO 3: Aplicar security a rutas protegidas
// ============================================================
// Descomenta los dos bloques @openapi a continuación.
// Observa la diferencia con los GET de arriba:
//   - security: [{ BearerAuth: [] }] → requiere JWT
//
// Después de descomentar:
//   1. Haz POST /api/v1/auth/login → copia el token
//   2. En Swagger UI → haz clic en "Authorize" → pega el token
//   3. Prueba POST /items → debe funcionar
//   4. Retira el token → vuelve a intentar → debe fallar con 401
//
// Referencia: 1-teoria/04-schemas-seguridad.md

// /**
//  * @openapi
//  * /api/v1/items:
//  *   post:
//  *     tags: [Items]
//  *     summary: Create a new item (requires JWT)
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CreateItemDto'
//  *     responses:
//  *       201:
//  *         description: Item created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Item'
//  *       400:
//  *         description: Invalid input
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *       401:
//  *         description: Unauthorized
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */
itemRouter.post('/', authMiddleware, itemController.create);

// /**
//  * @openapi
//  * /api/v1/items/{id}:
//  *   delete:
//  *     tags: [Items]
//  *     summary: Delete an item (requires JWT)
//  *     security:
//  *       - BearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       204:
//  *         description: Item deleted
//  *       401:
//  *         description: Unauthorized
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  *       404:
//  *         description: Item not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Error'
//  */
itemRouter.delete('/:id', authMiddleware, itemController.remove);
