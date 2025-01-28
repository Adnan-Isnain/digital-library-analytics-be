
import prismaClient from '@config/db';
import { BookRepository } from '@repository/book';
import { UserRepository } from '@repository/user';

const userRepository = new UserRepository(prismaClient);
const bookRepository = new BookRepository(prismaClient);

export { userRepository, bookRepository };
