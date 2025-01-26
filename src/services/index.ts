import { userRepository, bookRepository } from "../repository";
import { BookService } from "./book";
import { UserService } from "./user";

const userService = new UserService(userRepository)
const bookService = new BookService(bookRepository)
export {userService, bookService}