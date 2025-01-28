import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

interface ValidationError {
  instancePath: string;
  message?: string;
}

export async function requestValidator(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    if (error.validation) {
      const validationErrors: { field: string; message?: string }[] = error.validation.map((err: ValidationError) => {
        const field = err.instancePath.replace(/^\/?body\//, '').replace(/^\/+/, '');
        return {
          field,
          message: err.message,
        };
      });

      return reply.status(422).send(validationErrors);
    }

    // Default error handler for other types of errors
    return reply.status(error.statusCode || 500).send({
      error: error.name || 'Internal Server Error',
      message: error.message || 'Something went wrong with our server',
    });
  });
}
