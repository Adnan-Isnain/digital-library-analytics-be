import * as fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

export function register(fastify: fastify.FastifyInstance) {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    sign: {
      expiresIn: process.env.JWT_EXPIRATION,
    },
  });
}