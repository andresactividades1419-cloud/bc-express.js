import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import itemRoutes from './routes/item.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import { globalLimiter, corsOptions } from './config/security.js';

const app = express();

// Security layers — order matters
app.use(helmet());
app.use(globalLimiter);
app.options('*', cors(corsOptions)); // preflight
app.use(cors(corsOptions));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sanitize inputs AFTER parsing, BEFORE routes
app.use(mongoSanitize());

// Health check
app.get('/api/v1/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
// TODO: Cambia 'items' por el nombre de tu recurso en plural
// Ejemplos: /api/v1/books, /api/v1/medicines, /api/v1/members
app.use('/api/v1/items', itemRoutes);

// Error handling (always last)
app.use(notFound);
app.use(errorHandler);

export { app };
