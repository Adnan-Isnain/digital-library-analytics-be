import { FastifyInstance } from "fastify";
import { AuthController } from "@controllers/auth";
import { authSchema } from "@models/schema/user";


export async function auth(fastify: FastifyInstance, authController: AuthController) {
  fastify.register(async route => {
    route.post("/register", {
      schema: authSchema,
    }, authController.register.bind(authController));
    
    route.post("/login", {
      schema: authSchema,
    }, authController.login.bind(authController));
  }, { prefix: '/user/v1' });
}