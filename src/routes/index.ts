import { FastifyInstance } from 'fastify';
import { initController } from '../controllers';
import { auth } from './auth';

export function registerRoutes(fastify: FastifyInstance) {
  const { authController } = initController(fastify);
  fastify.register(auth, authController);
}
