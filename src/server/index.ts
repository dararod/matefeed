import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyJwt from 'fastify-jwt';
import fastifySwagger from 'fastify-swagger';
import { buildSchema } from 'graphql';
import { loadSchemaFiles, codegenMercurius } from 'mercurius-codegen';
import mercurius from 'mercurius';
import path from 'path';

import { getEnv } from './infrastructure/environment';
import databasePlugin from './plugins/database';
import nextPlugin from './plugins/next';
import servicesPlugin from './plugins/services';
import routes from './routes';
import packageJson from '../../package.json';
import resolvers from './graphql/resolvers';

import type { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from 'fastify-cookie';
import type { GraphQLResolverContext } from './@types/global';

export default async (): Promise<FastifyInstance> => {
  const host = `localhost:${getEnv('PORT')}`;
  const server = fastify({
    logger: {
      prettyPrint: true,
      level: 'debug',
    },
  });

  const { schema } = loadSchemaFiles(path.join(__dirname, 'graphql/schema/**/*.gql'), {
    watchOptions: {
      enabled: process.env.NODE_ENV === 'development',
      onChange(schema) {
        server.graphql.replaceSchema(buildSchema(schema.join('\n')));
        server.graphql.defineResolvers(resolvers);

        codegenMercurius(server, {
          targetPath: path.join(__dirname, 'graphql/generated.ts'),
          operationsGlob: path.join(__dirname, 'graphql/operations/**/*.gql'),
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
    graphiql: false,
    ide: false,
    path: '/graphql',
    context: async (req) => {
      const authorization = req.headers.authorization;
      const token = authorization.split(' ')[1];
      const services = server.services;
      const context = {
        request: req,
        services,
      }

      if (!token) {
        return {
          ...context,
          user: null,
        } as GraphQLResolverContext;
      }

      const claims = server.jwt.verify(token);
      const userId = (claims as unknown as Record<string, string>).id;
      const user = await server.services.users.findById(userId);

      return {
        ...context,
        user,
      } as GraphQLResolverContext;
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

  if (process.env.NODE_ENV === 'development') {
    const altairFastifyPlugin = (await import('altair-fastify-plugin')).default;

    await server.register(altairFastifyPlugin, {
      path: '/altair',
      baseURL: '/altair/',
      endpointURL: '/graphql',
      initialQuery: `
      query {
        id
        firstName
        lastName
        email
        username
        createdAt
        updatedAt
      }
      `,
    });
  }

  return server;
};
