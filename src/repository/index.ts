
import prismaClient from '../config/db';
import { UserRepository } from './user';

const userRepository = new UserRepository(prismaClient);

export { userRepository };
