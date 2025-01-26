// src/repositories/UserRepository.ts
import { PrismaClient, User } from '@prisma/client';

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
}
