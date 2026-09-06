// ============================================
// SERVER — Arranque y bootstrap con logger Winston
// ============================================
import app from './app';
import { logger } from './config/logger';

const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API v1 events: http://localhost:${PORT}/api/v1/events`);
});
