import { RegisterUserDto } from '../../../domain/user/dto';
import { ApiError } from '../../../infrastructure/error/ApiError';

import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import type { RegisterUser } from '../../../domain/user/dto';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void,
): void {
  fastify.post('/register', {
    schema: {
      body: RegisterUserDto,
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = request.body as RegisterUser;
        const created = await fastify.services.users.register(payload);

        return reply.status(201).send(created);
      } catch (err) {
        if (err instanceof ApiError) {
          return err.reply(reply);
        }

        return reply.status(500).send({
          message: err.toString(),
        });
      }
    },
  });

  done();
}
