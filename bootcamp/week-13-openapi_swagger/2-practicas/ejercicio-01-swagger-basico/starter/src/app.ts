import express from 'express';
import cors from 'cors';
import { productRouter } from './routes/product.routes';
import { swaggerSpec } from './config/swagger';

export const app = express();

app.use(cors());
app.use(express.json());

// ============================================================
// PASO 2: Montar Swagger UI
// ============================================================
// Descomenta el bloque completo a continuación.
//
// swaggerUi.serve → sirve los assets estáticos de Swagger UI
// swaggerUi.setup → renderiza la spec en la UI
// /api-docs.json  → expone la spec como JSON crudo (útil para
//                   integración con Postman o herramientas externas)
//
// Referencia: 1-teoria/02-swagger-express.md

// import swaggerUi from 'swagger-ui-express';
//
// app.use(
//   '/api-docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec, {
//     swaggerOptions: { persistAuthorization: true },
//   }),
// );
//
// app.get('/api-docs.json', (_req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.json(swaggerSpec);
// });

// API routes
app.use('/api/v1/products', productRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});
