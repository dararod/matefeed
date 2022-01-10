import { FastifyInstance, RegisterOptions } from 'fastify';
import fp from 'fastify-plugin';

import { UserRepository, UserService } from '../domain/user';

export interface Services {
  users: UserService;
}

export default fp(
  async (
    fastify: FastifyInstance,
    _options: RegisterOptions,
    done: () => void,
  ): Promise<void> => {
    const database = fastify.database;

    fastify.decorate('services', {
      users: new UserService(new UserRepository(database)),
    });

    done();
  },
  {
    name: 'services',
    dependencies: ['database'],
  },
);
