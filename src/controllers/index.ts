import fastify, { FastifyInstance } from "fastify";
import { userService } from "../services";
import { JWTService } from "../services/jwt";
import { AuthController } from "./auth";

export const initController = (fastify: FastifyInstance) => {
    const jwtService = new JWTService(fastify)
    const authController = new AuthController(jwtService, userService)

    return {authController}
}