import { Book, User } from "@prisma/client";
import { UserRepository } from "../repository/user";
import { userRole } from "../models/enum/role";
import { BookRepository } from "../repository/book";

export class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async getBooks(page?: number, limit? : number): Promise<Book[]> {
    return await this.bookRepository.getAll(page || 1, limit || 10);
  }
}