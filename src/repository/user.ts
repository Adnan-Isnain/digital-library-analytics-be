// src/repositories/UserRepository.ts
import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(email: string, password: string, name: string, role: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password,
        name,
        role,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
