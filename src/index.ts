import fastify from 'fastify'
import { register } from './plugins/jwt'
import { registerRoutes } from './routes';


const server = fastify({
  logger: true
})
register(server)


registerRoutes(server)
server.get('/ping', async () => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err: Error | null, address: string) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.debug(`Server listening at ${address}`)
})