import log from './utils/logger.util';
import app from './app';
import { ENV } from './env';
import { prisma } from './utils/db.util';

const { BACKEND_PORT } = ENV;

//-------------------------------------------//
// --- --- --- API Server Listen --- --- --- //
//-------------------------------------------//

const server = app.listen(BACKEND_PORT, () => {
  log.info(`Server is running on Port: ${BACKEND_PORT}`);
});

// Run on Termination
process.on('SIGTERM', () => {
  server.close(() => {
    log.error('Server Closed');
    prisma.$disconnect();
  });
});

// Run on Interrupt
process.on('SIGINT', () => {
  server.close(() => {
    log.error('Server Interrupted');
    prisma.$disconnect();
  });
});
