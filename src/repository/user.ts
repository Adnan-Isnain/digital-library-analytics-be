// src/repositories/UserRepository.ts
import { userMembership } from '@models/enum/membership';
import { userRole } from '@models/enum/role';
import { userStatus } from '@models/enum/status';
import { Author, Member, Prisma, PrismaClient, User } from '@prisma/client';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async createUser(email: string, password: string, role: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password,
        role,
        member: role === userRole.member ? {
          create: {
            status: userStatus.pending,
            membershipLevel: userMembership.regular
          }
        } : undefined,
        author: role === userRole.author ? {
          create: {}
        } : undefined
      },
    });
  }

  async getUserByEmail(email: string, option?: Prisma.SelectAndInclude): Promise<User & { author?: Author | null; member?: Member | null } | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      ...option
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
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
