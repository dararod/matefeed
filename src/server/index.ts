import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyJwt from 'fastify-jwt';
import fastifySwagger from 'fastify-swagger';
import { buildSchema } from 'graphql';
import { codegenMercurius, loadSchemaFiles } from 'mercurius-codegen';
import mercurius from 'mercurius';
import path from 'path';

import { getEnv } from './infrastructure/environment';
import knexconfig from '../config/database/knexfile';
import databasePlugin from './plugins/database';
import nextPlugin from './plugins/next';
import servicesPlugin from './plugins/services';
import routes from './routes';
import packageJson from '../../package.json';
import { resolvers } from './graphql';

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

  const { schema } = loadSchemaFiles(path.join(__dirname, 'graphql/**/*.gql'), {
    watchOptions: {
      enabled: process.env.NODE_ENV === 'development',
      onChange(schema) {
        server.graphql.replaceSchema(buildSchema(schema.join('\n')));
        server.graphql.defineResolvers(resolvers);

        codegenMercurius(server, {
          targetPath: path.join(__dirname, 'graphql/generated.ts'),
          operationsGlob: path.join(__dirname, 'graphql/**/*.gql'),
        }).catch(console.error)
      },
    }
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
  await server.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
    context: async (req) => {
      const cookies = req.cookies;
      
      if (!cookies?.token) {
        return {
          ...req,
          user: null,
        }
      }

      const claims = server.jwt.verify(cookies.token);
      const userId = (claims as unknown as Record<string, string>).id;
      const user = server.services.users.findById(userId);

      return {
        ...req,
        user,
      }
    },
  });
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
