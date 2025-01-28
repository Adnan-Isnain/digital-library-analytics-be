import { FastifyInstance } from "fastify";
import { BookController } from "@controllers/book";
import { hasPermission } from "@middleware/request";
import { createBookRoles } from "@routes/permission";
import { createBookSchema } from "@models/schema/book";
import { ICreateNewBook } from "@models/interface/book";


export async function book(fastify: FastifyInstance, bookController: BookController) {
  fastify.register(async route => {
    route.get("/", bookController.getAllBooks.bind(bookController));
    route.addHook('onRequest', hasPermission(createBookRoles)).post<{
      Body: ICreateNewBook
    }>("/", {
      schema: createBookSchema,
    },
      bookController.createNewBook.bind(bookController)
    )
  },
    { prefix: '/book/v1' })
}