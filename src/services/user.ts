import { Author, Member, Prisma, User } from "@prisma/client";
import { UserRepository } from "@repository/user";
import { userRole } from "@models/enum/role";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(email: string, password: string, role? : userRole): Promise<User> {
    return this.userRepository.createUser(email, password, role ||  userRole.member);
  }

  async findUser(email: string, options?: Prisma.SelectAndInclude): Promise<User & { author?: Author | null; member?: Member | null } | null> {
    return this.userRepository.getUserByEmail(email, options);
  }
}