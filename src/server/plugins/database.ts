import { FastifyInstance, RegisterOptions } from 'fastify';
import fp from 'fastify-plugin';
import Knex from 'knex';
import knexStringcase from 'knex-stringcase';

import knexconfig from '../../config/database/knexfile';

export default fp(
  async (
    fastify: FastifyInstance,
    _options: RegisterOptions,
    done: () => void,
  ): Promise<void> => {
    fastify.decorate('database', Knex(knexStringcase(knexconfig)));

    done();
  },
  {
    name: 'database',
  },
);
