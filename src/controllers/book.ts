import { FastifyRequest, FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { BookService } from '@services/book';
import { UserService } from '@services/user';
import { ICreateNewBook } from '@models/interface/book';
import { IBaseRequest } from '@models/interface/request';
import { IJwtUser } from '@models/interface/jwt';
import { Prisma } from '@prisma/client';


export class BookController {
  private userService: UserService;
  private bookService: BookService;

  constructor(userService: UserService, bookService: BookService) {
    this.userService = userService
    this.bookService = bookService
  }

  async getAllBooks(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as IBaseRequest;
    
    try {
      const page = query.page && !isNaN(Number(query.page)) ? Number(query.page) : 1;
      const limit = query.limit && !isNaN(Number(query.limit)) ? Number(query.limit) : 10;
      const books = await this.bookService.getBooks(page, limit)
      return reply.send({
        data: books
      });
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Something went wrong with our end' });
    }
  }

  async createNewBook(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as ICreateNewBook
    const { email } = request.user as IJwtUser
    try {
      const user = await this.userService.findUser(email, {
        include: {
          author: true
        }
      } as Prisma.SelectAndInclude)
      
      const authorId = user?.author?.id
      if(!user || !authorId) {
        reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: 'Something when wrong with our end'
        })
        return
      }

      const isCreated = await this.bookService.createNewBook({
        ...body,
        authorId
      } as ICreateNewBook)
      if (!isCreated) {
        reply.code(StatusCodes.UNPROCESSABLE_ENTITY).send({
          error: 'Failed to created new book'
        })
        return
      }

      reply.code(StatusCodes.CREATED)
    } catch (error) {
      console.error(error)
      reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong with our end' });
    }
  }
}
