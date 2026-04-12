import winston from 'winston';
import { env } from '../config/env';

const { combine, timestamp, errors, json, colorize, simple } = winston.format;

// Production: JSON estructurado (para Logtail/BetterStack)
const productionFormat = combine(
  timestamp({ format: 'YYYY-MM-DDTHH:mm:ssZ' }),
  errors({ stack: true }),
  json(),
);

// Development: colorized y legible en terminal
const developmentFormat = combine(
  colorize(),
  timestamp({ format: 'HH:mm:ss' }),
  simple(),
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: env.NODE_ENV === 'production' ? productionFormat : developmentFormat,
    silent: env.NODE_ENV === 'test',
  }),
];

// Logtail transport — si existe LOGTAIL_SOURCE_TOKEN
if (env.NODE_ENV === 'production' && env.LOGTAIL_SOURCE_TOKEN) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Logtail } = require('@logtail/node');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { LogtailTransport } = require('@logtail/winston');
    const logtail = new Logtail(env.LOGTAIL_SOURCE_TOKEN);
    transports.push(new LogtailTransport(logtail));
  } catch {
    // @logtail packages are optional — install with: pnpm add @logtail/node @logtail/winston
  }
}

export const logger = winston.createLogger({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transports,
});
