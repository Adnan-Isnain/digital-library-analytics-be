import { FastifyRequest, FastifyReply } from 'fastify';

export async function jwtAuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Verify the JWT token (check the Authorization header)
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      reply.status(401).send({ message: 'Token is required' });
      return;
    }

    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: 'Unauthorized: Invalid or expired token' });
  }
}
