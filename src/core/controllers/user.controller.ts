import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { PaginateUserDto } from '../dtos/user/paginateUser.dto';
import { UpdateUserDto } from '../dtos/user/updateUser.dto';
import { ICreateUserHandler } from '../interfaces/handlers/user/createUserHandler.interface';
import { IPaginateUserHandler } from '../interfaces/handlers/user/paginateHandler.interface';
import { IUpdateUserHandler } from '../interfaces/handlers/user/updateUserHandler.interface';

@Controller('/v1/users')
export class UserController {
  constructor(
    @Inject('IPaginateUserHandler')
    private readonly paginateUserHandler: IPaginateUserHandler,
    @Inject('ICreateUserHandler')
    private readonly createUserHandler: ICreateUserHandler,
    @Inject('IUpdateUserHandler')
    private readonly updateUserHandler: IUpdateUserHandler,
  ) {}

  @Get()
  async find(@Query() model: PaginateUserDto) {
    return await this.paginateUserHandler.handle(model);
  }

  @Post()
  async create(@Body() model: CreateUserDto) {
    return await this.createUserHandler.handle(model);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() model: UpdateUserDto) {
    return await this.updateUserHandler.handle(id, model);
  }
}
