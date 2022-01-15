import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyJwt from 'fastify-jwt';
import fastifySwagger from 'fastify-swagger';

import { getEnv } from './infrastructure/environment';
import knexconfig from '../config/database/knexfile';
import databasePlugin from './plugins/database';
import nextPlugin from './plugins/next';
import servicesPlugin from './plugins/services';
import routes from './routes';
import packageJson from '../../package.json';

import type { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from 'fastify-cookie';

export default async (): Promise<FastifyInstance> => {
  const host = `localhost:${getEnv('PORT')}`;
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  await server.register(databasePlugin);
  await server.register(fastifyJwt, {
    secret: getEnv('JWT_SECRET'),
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });
  await server.register(fastifyCookie, {
    secret: getEnv('COOKIE_SECRET'),
    parseOptions: {},
  } as FastifyCookieOptions);
  await server.register(fastifySwagger, {
    routePrefix: 'api/docs',
    swagger: {
      info: {
        title: 'Matefeed API',
        version: packageJson.version,
      },
      host,
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
