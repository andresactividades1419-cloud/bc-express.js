import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

// ============================================================
// PASO 1: Definir schemas reutilizables en components.schemas
// ============================================================
// Descomenta el bloque 'schemas' dentro de components.
// Define: Item, Error, CreateItemDto, LoginDto
//
// Verifica: GET /api-docs.json → debe tener components.schemas
//
// Referencia: 1-teoria/04-schemas-seguridad.md

// ============================================================
// PASO 2: Agregar BearerAuth security scheme
// ============================================================
// Descomenta el bloque 'securitySchemes' dentro de components.
// BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
//
// Verifica: en Swagger UI aparece el botón "Authorize" en la parte superior
//
// Referencia: 1-teoria/04-schemas-seguridad.md

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Items API',
      version: '1.0.0',
      description: 'API de items con autenticación JWT — Semana 13',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      { name: 'Items', description: 'Gestión de items' },
      { name: 'Auth', description: 'Autenticación JWT' },
    ],
    components: {
      // PASO 1: Descomenta schemas:
      // schemas: {
      //   Item: {
      //     type: 'object',
      //     required: ['id', 'name'],
      //     properties: {
      //       id:    { type: 'string', example: '1' },
      //       name:  { type: 'string', example: 'Laptop Pro' },
      //       price: { type: 'number', format: 'float', example: 999.99 },
      //       stock: { type: 'integer', example: 10, default: 0 },
      //     },
      //   },
      //   Error: {
      //     type: 'object',
      //     properties: {
      //       error: { type: 'string', example: 'Resource not found' },
      //     },
      //   },
      //   CreateItemDto: {
      //     type: 'object',
      //     required: ['name'],
      //     properties: {
      //       name:  { type: 'string', example: 'USB-C Hub' },
      //       price: { type: 'number', example: 29.99 },
      //       stock: { type: 'integer', default: 0 },
      //     },
      //   },
      //   LoginDto: {
      //     type: 'object',
      //     required: ['email', 'password'],
      //     properties: {
      //       email:    { type: 'string', format: 'email', example: 'admin@example.com' },
      //       password: { type: 'string', example: 'password123' },
      //     },
      //   },
      // },

      // PASO 2: Descomenta securitySchemes:
      // securitySchemes: {
      //   BearerAuth: {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //   },
      // },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
