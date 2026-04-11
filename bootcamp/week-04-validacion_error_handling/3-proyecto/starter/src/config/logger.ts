// ============================================
// CONFIG — logger de Winston + stream para Morgan
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

// TODO: Implementar el logger de Winston
// 1. Usar createLogger con:
//    - level: 'http' en desarrollo, 'warn' en producción
//    - format.combine + format.timestamp en todos los entornos
//    - En desarrollo: format.colorize + format.printf con timestamp, level, message
//    - En producción: format.json
// 2. Transports:
//    - Console siempre
//    - File({ filename: 'logs/error.log', level: 'error' }) solo en producción
//
// Ejemplo de la estructura esperada:
// export const logger = createLogger({ ... });

// Placeholder — reemplaza con tu implementación
export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: format.combine(
    format.timestamp(),
    // TODO: reemplaza con colorize+printf en dev o json en prod
    format.simple()
  ),
  transports: [
    // TODO: nuevo transport.Console() con el formato correcto
    new transports.Console(),
    // TODO: añade transport.File solo en producción
  ],
});

// TODO: Implementar la stream de Morgan que redirige a logger.http()
// export const morganStream = { write: (message: string) => logger.http(message.trim()) };
//
// TODO: Implementar el middleware de Morgan con la stream
// const morganFormat = isDev ? 'dev' : 'combined';
// export const morganMiddleware = morgan(morganFormat, { stream: morganStream });

// Placeholder — reemplaza con tu implementación
export const morganMiddleware = morgan('dev');
