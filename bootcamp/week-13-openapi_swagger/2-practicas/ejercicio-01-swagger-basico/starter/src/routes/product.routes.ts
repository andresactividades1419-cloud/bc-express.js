import { Router } from 'express';
import * as productController from '../controllers/product.controller';

const router = Router();

// ============================================================
// PASO 3: Documentar GET /products y GET /products/:id
// ============================================================
// Descomenta los dos bloques @openapi a continuación.
// Cada bloque va justo antes de la llamada router.get().
//
// Puntos clave:
//   - tags: [Products] → agrupa los endpoints en Swagger UI
//   - parameters in: path → documenta el parámetro :id
//   - responses → documenta los códigos de estado posibles
//
// Referencia: 1-teoria/03-documentar-rutas.md

// /**
//  * @openapi
//  * /api/v1/products:
//  *   get:
//  *     tags: [Products]
//  *     summary: List all products
//  *     description: Returns the full list of products from the in-memory store.
//  *     responses:
//  *       200:
//  *         description: Array of products
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   id:    { type: string, example: "1" }
//  *                   name:  { type: string, example: "Laptop Pro" }
//  *                   price: { type: number, example: 999.99 }
//  *                   stock: { type: integer, example: 5 }
//  */
router.get('/', productController.getAll);

// /**
//  * @openapi
//  * /api/v1/products/{id}:
//  *   get:
//  *     tags: [Products]
//  *     summary: Get product by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: Product identifier
//  *         schema:
//  *           type: string
//  *           example: "1"
//  *     responses:
//  *       200:
//  *         description: Product found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:    { type: string }
//  *                 name:  { type: string }
//  *                 price: { type: number }
//  *                 stock: { type: integer }
//  *       404:
//  *         description: Product not found
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error: { type: string, example: "Product not found" }
//  */
router.get('/:id', productController.getById);

// ============================================================
// PASO 4: Documentar POST /products y DELETE /products/:id
// ============================================================
// Descomenta los dos bloques @openapi a continuación.
//
// Puntos clave:
//   - POST: requestBody es required y tiene validation (400)
//   - DELETE: respuesta 204 NO tiene content (sin cuerpo)
//
// Referencia: 1-teoria/03-documentar-rutas.md

// /**
//  * @openapi
//  * /api/v1/products:
//  *   post:
//  *     tags: [Products]
//  *     summary: Create a new product
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required: [name, price]
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: "Wireless Headphones"
//  *               price:
//  *                 type: number
//  *                 format: float
//  *                 example: 79.99
//  *               stock:
//  *                 type: integer
//  *                 default: 0
//  *                 example: 20
//  *     responses:
//  *       201:
//  *         description: Product created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:    { type: string }
//  *                 name:  { type: string }
//  *                 price: { type: number }
//  *                 stock: { type: integer }
//  *       400:
//  *         description: Invalid input — validation failed
//  */
router.post('/', productController.create);

// /**
//  * @openapi
//  * /api/v1/products/{id}:
//  *   delete:
//  *     tags: [Products]
//  *     summary: Delete a product
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *           example: "1"
//  *     responses:
//  *       204:
//  *         description: Product deleted successfully
//  *       404:
//  *         description: Product not found
//  */
router.delete('/:id', productController.remove);

export { router as productRouter };
