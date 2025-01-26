import { FastifyRequest, FastifyReply} from 'fastify';
import { UserService } from '../services/user';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services/jwt';
import bcryptjs from 'bcryptjs'
import {IUser} from './type'
import { userRole } from '../models/enum/role';


export class AuthController {
  private jwtService: JWTService;
  private userService: UserService;

  constructor(jwtService: JWTService, userService: UserService) {
    this.jwtService = jwtService;
    this.userService = userService;
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as IUser;

    try {
      const user = await this.userService.findUser(email)
      if(user){
        return reply.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
          error: 'User already exist'
        })
      }
      // Hash the password before storing it
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = await this.userService.register(email, hashedPassword);
      const token = await this.jwtService.signToken({
        email: newUser.email,
        role: newUser.role
      }, '15m')
      
      return reply.send({data:{token}});
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Something went wrong with our end' });
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password} = request.body as IUser;

    try {
      const user = await this.userService.findUser(email)
      if(!user){
        return reply.status(StatusCodes.UNAUTHORIZED).send({
          error: 'Invalid Email or Password '
        })
      }
      // Compared password
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if(!isPasswordValid){
        return reply.status(StatusCodes.UNAUTHORIZED).send({
          error: 'Invalid Email or Password '
        })
      }

      const token = await this.jwtService.signToken({
        email: user.email,
        role: user.role
      }, '15m')
      
      return reply.send({
        data: {token}
      });
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ error: 'Something went wrong with our end' });
    }
  }
}
