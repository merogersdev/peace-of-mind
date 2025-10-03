import log from './utils/logger.util';

import { ENV } from './env';

import app from './app';

async function main() {
  const { BACKEND_PORT } = ENV;

  app.listen(BACKEND_PORT, () => {
    log.info(`Server is running on Port: ${BACKEND_PORT}`);
  });
}

main();
