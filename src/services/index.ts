import { userRepository } from "../repository";
import { UserService } from "./user";

const userService = new UserService(userRepository)
export {userService}