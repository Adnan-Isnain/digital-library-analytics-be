import fastify, { FastifyInstance } from "fastify";
import { bookService, userService } from "../services";
import { JWTService } from "../services/jwt";
import { AuthController } from "./auth";
import { BookController } from "./book";

export const initController = (fastify: FastifyInstance) => {
    const jwtService = new JWTService(fastify)
    const authController = new AuthController(jwtService, userService)
    const bookController = new BookController(bookService)

    return {authController, bookController}
}