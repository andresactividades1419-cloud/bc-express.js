// ============================================
// CONFIG — Logger Winston + Morgan
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

const devFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize(),
  format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
);

const prodFormat = format.combine(
  format.timestamp(),
  format.json()
);

export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: isDev ? devFormat : prodFormat,
  transports: [
    new transports.Console(),
    ...(isDev ? [] : [new transports.File({ filename: 'logs/error.log', level: 'error' })]),
  ],
});

export const morganStream = {
  write: (message: string): void => {
    logger.http(message.trim());
  },
};

const morganFormat = isDev ? 'dev' : 'combined';
export const morganMiddleware = morgan(morganFormat, { stream: morganStream });
