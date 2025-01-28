import { IJwtUser } from '@models/interface/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function jwtAuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      reply.status(401).send({ message: 'Unauthorized: Missing token' });
      return;
    }

    const payload = await request.jwtVerify() as IJwtUser;
    request.user = payload;
  } catch (err) {
    reply.status(401).send({ message: 'Unauthorized: Invalid or expired token' });
  }
}
