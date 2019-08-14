import { Body, Controller, Post, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { ICreateUserHandler } from '../interfaces/handlers/user/createUserHandler.interface';

@Controller('/v1/users')
export class UserController {
  constructor(@Inject('ICreateUserHandler') private readonly createUserHandler: ICreateUserHandler) {}

  @Post()
  async create(@Body() model: CreateUserDto) {
    return await this.createUserHandler.handle(model);
  }
}
