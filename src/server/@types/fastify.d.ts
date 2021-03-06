import type { Knex } from 'knex';

import type { Services } from '../plugins/services';

declare module 'fastify' {
  export interface FastifyInstance {
    database: Knex;
    services: Services;
    user: {
      email: string;
      iat: number;
      exp: number;
    };
  }
}
