import { Body, Controller, Post, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { IUserHandler } from '../interfaces/handlers/userHandler.interface';

@Controller('/v1/users')
export class UserController {
  constructor(@Inject('IUserHandler') private readonly service: IUserHandler) {}

  @Post()
  async create(@Body() model: CreateUserDto) {
    return await this.service.create(model);
  }
}
