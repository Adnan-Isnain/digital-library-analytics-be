import { User } from "@prisma/client";
import { UserRepository } from "../repository/user";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(email: string, password: string, name: string, role: string): Promise<User> {
    return this.userRepository.createUser(email, password, name, role);
  }

  async findUser(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail(email);
  }
}