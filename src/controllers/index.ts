import { FastifyInstance } from "fastify";
import { bookService, userService } from "@services";
import { JWTService } from "@services/jwt";
import { AuthController } from "@controllers/auth";
import { BookController } from "@controllers/book";

export const initController = (fastify: FastifyInstance) => {
    const jwtService = new JWTService(fastify)
    const authController = new AuthController(jwtService, userService)
    const bookController = new BookController(userService, bookService)

    return {authController, bookController}
}