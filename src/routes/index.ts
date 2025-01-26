import { FastifyInstance } from 'fastify';
import { initController } from '../controllers';
import { auth } from './auth';
import { book } from './book';
import { jwtAuthMiddleware } from '../middleware/jwt';

export function registerRoutes(fastify: FastifyInstance) {
  const { authController, bookController } = initController(fastify);
  // Public API
  fastify.register(auth, authController);

  // API with JWT Token
  fastify.register(async route => {
    route.addHook('onRequest', jwtAuthMiddleware)
    route.register(book, bookController);
  })
}
