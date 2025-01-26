import { FastifyRequest, FastifyReply} from 'fastify';
import {IRequest} from './type'
import { BookService } from '../services/book';


export class BookController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    this.bookService = bookService
  }

  async getAllBooks(request: FastifyRequest, reply: FastifyReply) {
    const { page, limit} = request.params as IRequest;

    try {
      const books = await this.bookService.getBooks(page, limit)      
      return reply.send({
        data: books
      });
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Something went wrong with our end' });
    }
  }
}
