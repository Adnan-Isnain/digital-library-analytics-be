import { FastifyInstance } from 'fastify';

// Define JWT service for token generation and verification
export class JWTService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  // Method to generate a JWT token
  public signToken(payload: object, expiresIn: string = '1h'): string {
    return this.fastify.jwt.sign(payload, { expiresIn });
  }

  // Method to verify the token
  public verifyToken(token: string): object | string {
    try {
      return this.fastify.jwt.verify(token);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
