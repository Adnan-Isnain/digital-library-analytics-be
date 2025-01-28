import fastify from 'fastify'
import { register } from '@plugins/jwt'
import { registerRoutes } from '@routes';
import { requestValidator } from '@utils/validators';


const server = fastify({
  logger: true
})
requestValidator(server)
register(server)


registerRoutes(server)
server.listen({ port: 8080 }, (err: Error | null, address: string) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.debug(`Server listening at ${address}`)
})