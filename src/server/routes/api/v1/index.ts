import account from './account';

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.register(account, {
    prefix: 'account',
  });

  done();
}
