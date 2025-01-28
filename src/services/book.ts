import { Book, User } from "@prisma/client";
import { BookRepository } from "@repository/book";
import { ICreateNewBook } from "@models/interface/book";

export class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async getBooks(page?: number, limit?: number): Promise<Book[]> {
    return await this.bookRepository.getAll(page || 1, limit || 10);
  }

  async createNewBook(book: ICreateNewBook): Promise<boolean> {
    const data = this.bookRepository.findBySlug(book.slug)
    if (!data) {
      await this.bookRepository.createNewBook(book);
      return true
    }

    return true
  }
}