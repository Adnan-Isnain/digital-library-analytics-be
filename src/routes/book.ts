import { FastifyInstance } from "fastify";
import { BookController } from "../controllers/book";


export async function book(fastify: FastifyInstance, bookController: BookController) {
    fastify.get("/books", bookController.getAllBooks.bind(bookController));
  }