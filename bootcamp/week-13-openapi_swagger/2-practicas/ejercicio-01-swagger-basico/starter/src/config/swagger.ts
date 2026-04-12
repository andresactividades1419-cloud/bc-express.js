// ============================================================
// PASO 1: Configurar swagger-jsdoc
// ============================================================
// Descomenta el siguiente bloque completo.
// El objeto `options` define la spec base de OpenAPI.
//   - definition: info, servers, components (vacío por ahora)
//   - apis: glob hacia los archivos de rutas donde pondremos @openapi
//
// swaggerSpec se exporta y se usa en app.ts para montar la UI.
//
// Referencia: 1-teoria/02-swagger-express.md

// import swaggerJsdoc from 'swagger-jsdoc';
// import { env } from './env';
//
// const options: swaggerJsdoc.Options = {
//   definition: {
//     openapi: '3.1.0',
//     info: {
//       title: 'Products API',
//       version: '1.0.0',
//       description: 'CRUD de productos — Semana 13 Bootcamp Express',
//     },
//     servers: [
//       {
//         url: `http://localhost:${env.PORT}`,
//         description: 'Servidor de desarrollo',
//       },
//     ],
//   },
//   apis: ['./src/routes/*.ts'],
// };
//
// export const swaggerSpec = swaggerJsdoc(options);

// Placeholder para que TypeScript compile antes de descomentar
export const swaggerSpec = {};
