import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { IUserService } from '../interfaces/services/userService.interface';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly service: IUserService) {}

  @Post()
  async create(@Body() model: CreateUserDto) {
      return await this.service.create(model);
  }
}
