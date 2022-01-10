import makeServer from './server';

(async () => {
  if (process.env.NODE_ENV !== 'production') {
    const mod = await import('dotenv');

    mod.config();
  }

  const server = await makeServer();

  server.listen(process.env.PORT);
})();
