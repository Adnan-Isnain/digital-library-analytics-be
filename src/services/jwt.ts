import { IJwtUser } from '@models/interface/jwt';
import { FastifyInstance } from 'fastify';

export class JWTService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  public signToken(payload: IJwtUser, expiresIn: string = '1h'): string {
    return this.fastify.jwt.sign(payload, { expiresIn });
  }

  public verifyToken(token: string): object | string {
    try {
      return this.fastify.jwt.verify(token);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
