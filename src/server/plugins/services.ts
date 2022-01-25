import { FastifyInstance, RegisterOptions } from 'fastify';
import fp from 'fastify-plugin';

import { PostService } from '../domain/post';
import { UserRepository, UserService } from '../domain/user';

export interface Services {
  posts: PostService;
  users: UserService;
}

export default fp(
  async (
    fastify: FastifyInstance,
    _options: RegisterOptions,
    done: () => void,
  ): Promise<void> => {
    const database = fastify.database;
    const users = new UserService(new UserRepository(database));
    const posts = new PostService(database, users);

    fastify.decorate('services', {
      posts,
      users,
    });

    done();
  },
  {
    name: 'services',
    dependencies: ['database'],
  },
);
