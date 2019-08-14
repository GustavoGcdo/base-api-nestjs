import { Body, Controller, Post, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { IUserService } from '../interfaces/services/userService.interface';

@Controller('/v1/users')
export class UserController {
  constructor(@Inject('IUserService') private readonly service: IUserService) {}

  @Post()
  async create(@Body() model: CreateUserDto) {
    return await this.service.create(model);
  }
}
