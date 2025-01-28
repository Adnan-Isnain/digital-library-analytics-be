import { ICreateNewBook } from '@models/interface/book';
import { Book, PrismaClient} from '@prisma/client';

export class BookRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(page: number, limit: number){
    return await this.prisma.book.findMany({
      take: limit,
      skip: (page - 1)*limit,
      include:{
        series: {
          select: {
            name: true
          }
        },
        authors: {
          select: {
            name: true
          }
        }
      }
    })
  }

  async findBySlug(slug: string){
    return await this.prisma.book.findFirst({
      where: {
        slug
      }
    })
  }

  async createNewBook(book: ICreateNewBook){
    return await this.prisma.book.create({
      data: {
        title: book.title,
        slug: book.slug,
        isbn: book.isbn,
        authors: {
          connect: { id: book.authorId },
        },
        categories: {
          connect: book.categories.map(categorySlug => ({slug: categorySlug}))
        },
        series: book.seriesId ?  {
          connect: {
            id: book.seriesId
          }
        } : undefined
      }
    })
  }

  async updateBook(slug: string, book: Book){
    return await this.prisma.book.update({
      where: {
        slug
      },
      data: book
    })
  }

  async deleteBook(slug: string){
    return await this.prisma.book.update({
      where: {
        slug
      },
      data: {
        deletedAt: new Date()
      }
    })
  }
}
