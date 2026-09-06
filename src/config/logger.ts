import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
import { RequestHandler } from 'express';

const isProduction = process.env['NODE_ENV'] === 'production';

export const logger = createLogger({
  level: isProduction ? 'warn' : 'http',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    isProduction
      ? format.json()
      : format.printf(({ timestamp, level, message, stack }) => {
          const logMessage = stack || message;
          return `[${timestamp}] ${level}: ${logMessage}`;
        })
  ),
  transports: [
    new transports.Console({
      format: isProduction
        ? format.json()
        : format.combine(
            format.colorize({ all: true }),
            format.printf(({ timestamp, level, message, stack }) => {
              const logMessage = stack || message;
              return `[${timestamp}] ${level}: ${logMessage}`;
            })
          ),
    }),
    ...(isProduction
      ? [
          new transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),
        ]
      : []),
  ],
});

export const morganMiddleware: RequestHandler = morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: {
    write: (message: string) => {
      logger.http(message.trim());
    },
  },
});
