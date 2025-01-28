import '@fastify/jwt';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    email: string
    role: string
  }

  interface FastifyInstance {
    jwt: typeof fastifyJwt;
  }
}