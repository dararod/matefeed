import ms from 'ms';
import { Type } from '@sinclair/typebox';

import { RegisterUserDto } from '../../../domain/user/dto';
import { ApiError } from '../../../infrastructure/error/ApiError';
import basicAuth from '../../../utils/basic-auth';
import { getEnv } from '../../../infrastructure/environment';

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
  fastify.get('/login', {
    schema: {
      headers: {
        authorization: Type.String(),
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authorizationHeader = request.headers.authorization;
        const { username, password } = basicAuth(authorizationHeader);
        const { token, refreshToken } = await fastify.services.users.login(
          username,
          password,
        );

        // Sign a token cookie to hold the access token, this cookie
        // lives for aprox the same amount of time as the JWT access token
        reply.setCookie('token', token, {
          expires: new Date(Date.now() + ms(getEnv('JWT_TTL'))),
          secure: false,
          sameSite: 'lax',
          httpOnly: false,
          domain: 'localhost',
          path: '/',
        });

        // Sign a refreshToken cookie to hold the refresh token.
        reply.setCookie('refreshToken', refreshToken, {
          expires: new Date(Date.now() + ms(getEnv('JWT_REFRESH_TOKEN_TTL'))),
          secure: false,
          sameSite: 'lax',
          httpOnly: false,
          domain: 'localhost',
          path: '/',
        });

        return reply.redirect(302, '/');
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
