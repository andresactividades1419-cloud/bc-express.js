import rateLimit from 'express-rate-limit';
import cors, { CorsOptions } from 'cors';

// ============================================
// PASO 2: Rate limiter global
// ============================================
// Aplica a TODOS los endpoints: máx 100 requests por IP cada 15 min.
// standardHeaders: 'draft-7' → headers RateLimit-* en todas las respuestas.
// Descomenta el bloque completo:

// export const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos en milisegundos
//   max: 100,
//   standardHeaders: 'draft-7',
//   legacyHeaders: false,
//   message: { error: 'Too many requests, please try again later' },
// });

// Stub temporal — eliminar cuando implementes arriba
export const globalLimiter = rateLimit({ windowMs: 60_000, max: 1000 });

// ============================================
// PASO 3: Rate limiter para endpoints de auth
// ============================================
// Aplica SOLO a /login y /register: máx 5 intentos por IP cada 15 min.
// Protege contra ataques de fuerza bruta.
// Descomenta el bloque completo:

// export const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   standardHeaders: 'draft-7',
//   legacyHeaders: false,
//   message: { error: 'Too many login attempts, please try again later' },
// });

// Stub temporal — eliminar cuando implementes arriba
export const authLimiter = rateLimit({ windowMs: 60_000, max: 1000 });

// ============================================
// PASO 4: CORS con whitelist
// ============================================
// NUNCA usar cors() a secas → permite cualquier origen (inseguro).
// La whitelist permite solo orígenes conocidos.
// credentials: true es necesario para cookies HttpOnly.
// Descomenta el bloque completo:

// const ALLOWED_ORIGINS = [
//   'http://localhost:5173', // Vite dev server
//   'http://localhost:3001', // Otro cliente posible
// ];
//
// export const corsOptions: CorsOptions = {
//   origin: (origin, callback) => {
//     // Permitir requests sin origin (ej. Postman, curl, server-to-server)
//     if (!origin || ALLOWED_ORIGINS.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error(`CORS blocked: origin ${origin} not allowed`));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// Stub temporal — eliminar cuando implementes arriba
export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
};
