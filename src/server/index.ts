import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';

import knexconfig from '../config/database/knexfile';
import databasePlugin from './plugins/database';
import nextPlugin from './plugins/next';
import servicesPlugin from './plugins/services';
import routes from './routes';
import packageJson from '../../package.json';

import { FastifyInstance } from 'fastify';

export default async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(databasePlugin);
  await server.register(fastifySwagger, {
    routePrefix: 'api/docs',
    swagger: {
      info: {
        title: 'Matefeed API',
        version: packageJson.version,
      },
      host: `localhost:${process.env.PORT}`,
      tags: [],
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });
  await server.register(routes);
  await server.register(nextPlugin);
  await server.register(servicesPlugin);

  if (process.env.NODE_ENV !== 'development') {
    await server.database.migrate.latest({
      ...knexconfig.migrations,
      directory: 'src/config/database/.migrations',
    });
  }

  return server;
};
