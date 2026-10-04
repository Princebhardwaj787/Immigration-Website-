import { createApp } from './app';
import { connectDB, disconnectDB } from './config/db';
import { env } from './config/env';
import { logger } from './utils/logger';

async function main() {
  await connectDB();

  const app = createApp();
  const server = app.listen(env.port, () => {
    logger.info(`API listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`${signal} received, shutting down...`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    // Failsafe if connections keep the server open.
    setTimeout(() => process.exit(1), 8000).unref();
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('unhandledRejection', (reason) => {
    logger.error('unhandled rejection', { reason: String(reason) });
  });
}

main().catch((err) => {
  logger.error('failed to start server', { error: (err as Error).message });
  process.exit(1);
});
