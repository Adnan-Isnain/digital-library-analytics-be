import { userRepository, bookRepository } from "@repository";
import { BookService } from "@services/book";
import { UserService } from "@services/user";

const userService = new UserService(userRepository)
const bookService = new BookService(bookRepository)
export {userService, bookService}