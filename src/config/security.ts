import rateLimit from 'express-rate-limit';
import cors, { CorsOptions } from 'cors';

// Global limiter — todos los endpoints: 100 req / 15 min
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes, intenta de nuevo mas tarde' },
});

// Auth limiter — login/register: 5 req / 15 min (proteccion contra fuerza bruta)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Demasiados intentos de acceso, intenta de nuevo mas tarde' },
});

// CORS whitelist — orígenes explícitos autorizados a consumir la API
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3001',
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS bloqueado: origen ${origin} no permitido`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
