import makeServer from './server';
import { getEnv } from './server/infrastructure/environment';

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const mod = await import('dotenv');

    mod.config();
  }

  const server = await makeServer();

  server.listen(getEnv('PORT'));
})();
