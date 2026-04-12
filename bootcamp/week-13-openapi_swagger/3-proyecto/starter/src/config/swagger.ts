import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

// ============================================================
// TODO: Configurar la documentación OpenAPI de tu API
// ============================================================
//
// PASOS:
//
// 1. Completa el campo `info` con un título y descripción de TU dominio.
//    Por ejemplo: "Biblioteca API", "Farmacia API", "Gimnasio API".
//
// 2. En `components.schemas`, define los modelos de tu dominio:
//    - [TuRecurso]: campos de tu modelo Prisma
//    - Create[TuRecurso]Dto: campos requeridos para crear uno
//    - Update[TuRecurso]Dto: campos opcionales para editar
//    - Error: { error: string } — modelo de error genérico
//    - AuthResponse: { accessToken: string } — respuesta de login
//    - RegisterDto, LoginDto: inputs de autenticación
//
// 3. Mantén `securitySchemes.BearerAuth` como está — ya configurado.
//
// 4. En `tags`, cambia "Items" por el nombre de tu recurso principal.
//
// Referencia: 1-teoria/04-schemas-seguridad.md

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      // TODO: Cambia el título y descripción a tu dominio
      title: 'Mi Dominio API',
      version: '1.0.0',
      description: 'API REST para gestión de [tu dominio] — Semana 13 Bootcamp ExpressJS',
      contact: {
        name: 'Soporte API',
        email: 'soporte@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      { name: 'Auth', description: 'Registro e inicio de sesión' },
      // TODO: Cambia 'Items' por el nombre de tu recurso
      { name: 'Items', description: 'Gestión del recurso principal' },
    ],
    components: {
      schemas: {
        // TODO: Renombra y adapta estos schemas a tu dominio

        // Schema del recurso principal
        Item: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id:          { type: 'string', example: 'cuid123abc' },
            name:        { type: 'string', example: 'Ejemplo de item' },
            description: { type: 'string', nullable: true },
            price:       { type: 'number', format: 'float', example: 9.99 },
            stock:       { type: 'integer', example: 0 },
            active:      { type: 'boolean', example: true },
            createdAt:   { type: 'string', format: 'date-time' },
            updatedAt:   { type: 'string', format: 'date-time' },
          },
        },

        // Schema para crear el recurso
        CreateItemDto: {
          type: 'object',
          required: ['name'],
          properties: {
            name:        { type: 'string', minLength: 2, example: 'Nuevo item' },
            description: { type: 'string' },
            price:       { type: 'number', minimum: 0, example: 9.99 },
            stock:       { type: 'integer', minimum: 0, default: 0 },
          },
        },

        // Schema para actualizar el recurso (todos opcionales)
        UpdateItemDto: {
          type: 'object',
          properties: {
            name:        { type: 'string', minLength: 2 },
            description: { type: 'string' },
            price:       { type: 'number', minimum: 0 },
            stock:       { type: 'integer', minimum: 0 },
            active:      { type: 'boolean' },
          },
        },

        // Schemas de autenticación
        RegisterDto: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'usuario@example.com' },
            password: { type: 'string', minLength: 8, example: 'Contraseña123!' },
            name:     { type: 'string', minLength: 2, example: 'Juan García' },
          },
        },
        LoginDto: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'usuario@example.com' },
            password: { type: 'string', example: 'Contraseña123!' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
          },
        },
        UserProfile: {
          type: 'object',
          properties: {
            id:        { type: 'string' },
            email:     { type: 'string', format: 'email' },
            name:      { type: 'string' },
            role:      { type: 'string', enum: ['user', 'admin'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },

        // Schema de error genérico — reutilizable en todos los errores
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensaje de error descriptivo' },
          },
        },
      },

      // Security scheme — NO modificar
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce el token JWT obtenido en POST /auth/login',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
