
import prismaClient from '../config/db';
import { BookRepository } from './book';
import { UserRepository } from './user';

const userRepository = new UserRepository(prismaClient);
const bookRepository = new BookRepository(prismaClient);

export { userRepository, bookRepository };
