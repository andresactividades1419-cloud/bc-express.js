import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import eventRoutes from './routes/event.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import { globalLimiter, corsOptions } from './config/security.js';

const app = express();

// Capas de seguridad — el orden importa
app.use(helmet());
app.use(globalLimiter);
// Express 5 (path-to-regexp v8) ya no acepta el comodin '*' suelto —
// requiere una ruta con nombre o una regex. Se usa una regex para
// interceptar el preflight de CORS en cualquier ruta.
app.options(/.*/, cors(corsOptions)); // preflight
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// express-mongo-sanitize es un middleware pensado para Express 4: intenta
// reasignar req.query, que en Express 5 es una propiedad de solo lectura
// (getter sin setter), y sin este parche el proceso crashea con
// "Cannot set property query of #<IncomingMessage> which has only a getter".
// Se redefine req.query como escribible ANTES de sanitizar, sin cambiar su
// valor ni su comportamiento para el resto de la app.
app.use((req, _res, next) => {
  Object.defineProperty(req, 'query', {
    ...Object.getOwnPropertyDescriptor(req, 'query'),
    value: req.query,
    writable: true,
    configurable: true,
  });
  next();
});

// Sanitizar entradas DESPUES de parsear, ANTES de las rutas
app.use(mongoSanitize());

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/events', eventRoutes);

// Manejo de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);

export { app };
