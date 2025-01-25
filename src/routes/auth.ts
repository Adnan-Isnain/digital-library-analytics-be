import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth";


export async function auth(fastify: FastifyInstance, authController: AuthController) {
    fastify.post("/register", authController.register.bind(authController));
    fastify.post("/login", authController.login.bind(authController));
  }