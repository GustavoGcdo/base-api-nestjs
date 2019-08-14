import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { PaginateUserDto } from '../dtos/user/paginateUser.dto';
import { ICreateUserHandler } from '../interfaces/handlers/user/createUserHandler.interface';
import { IPaginateUserHandler } from '../interfaces/handlers/user/paginateHandler.interface';

@Controller('/v1/users')
export class UserController {
  constructor(
    @Inject('IPaginateUserHandler')
    private readonly paginateUserHandler: IPaginateUserHandler,
    @Inject('ICreateUserHandler')
    private readonly createUserHandler: ICreateUserHandler,
  ) {}

  @Get()
  async find(@Query() model: PaginateUserDto) {
    return await this.paginateUserHandler.handle(model);
  }

  @Post()
  async create(@Body() model: CreateUserDto) {
    return await this.createUserHandler.handle(model);
  }
}
